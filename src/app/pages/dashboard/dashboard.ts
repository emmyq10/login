import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  auth = inject(Auth);

  users: any[] = [];

  ngOnInit(): void {
    console.log('Dashboard Loaded');
    this.getAllUsers();
  }

  getAllUsers() {
    console.log('API Function Running');
    this.auth.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(JSON.stringify(res));

        this.users = res.data;
      },

      error: (err) => {
        console.log(err);

        alert('Something went wrong');
      },
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.auth.deleteUser(id).subscribe({
        next: (res) => {
          console.log(res);

          alert('User deleted successfully');

          this.getAllUsers();
        },

        error: (err) => {
          console.log(err);

          alert('Something went wrong');
        },
      });
    }
  }
}
