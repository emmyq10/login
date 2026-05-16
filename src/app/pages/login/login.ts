import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth.';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  fb = inject(FormBuilder);
  auth = inject(Auth);
  router = inject(Router);

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // loginUser() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

  loginUser() {
    if (this.loginForm.valid) {
      this.auth.loginUser(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.result) {
            alert('Login Successful');

            this.router.navigateByUrl('/dashboard');
          } else {
            alert('Invalid Credentials');
          }
        },

        error: (err) => {
          console.log(err);

          alert('Something went wrong');
        },
      });
    }
  }
}
