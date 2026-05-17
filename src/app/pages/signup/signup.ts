import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  fb = inject(FormBuilder);
  auth = inject(Auth);
  router = inject(Router);

  signupForm = this.fb.group({
    userId: [0],
    userName: ['', [Validators.required]],
    emailId: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required]],
    role: ['', [Validators.required]],
    createdDate: [new Date().toISOString()],
    password: ['', [Validators.required, Validators.minLength(6)]],

    projectName: ['', [Validators.required]],
    refreshToken: [''],
    // refreshTokenExpiryTime: ['new Date().toISOString()']
    refreshTokenExpiryTime: [new Date().toISOString()],
  });

  registerUser() {
    if (this.signupForm.valid) {
      this.auth.registerUser(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert('Account Created');

          // CLEAR FORM
          this.signupForm.reset({
            userId: 0,
            userName: '',
            emailId: '',
            fullName: '',
            role: '',
            createdDate: new Date().toISOString(),
            password: '',
            projectName: '',
            refreshToken: '',
            refreshTokenExpiryTime: new Date().toISOString(),
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          alert('Something went wrong');
        },
      });
    } else {
      console.log('wrong try again');

      this.signupForm.markAllAsTouched();
    }
  }
}
