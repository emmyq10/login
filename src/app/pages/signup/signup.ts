import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  fb = inject(FormBuilder);
  auth = inject(Auth);

  signupForm = this.fb.group({

    UserId: [0],

    userName: [
      '',
      [Validators.required]
    ],

    emailId: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    fullName: [
      '',
      [Validators.required]
    ],

    role: [
      '',
      [Validators.required]
    ],

    createdDate: [
      new Date().toISOString()
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    projectName: [''],
    refershToken: [''],
    refreshTokenExpiryTime: ['new Date().toISOString()']
  });

  registerUser() {
    if (this.signupForm.valid) {
      this.auth.registerUser(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert('Account Created');
        },
        error: (error) => {
          console.error('Error registering user:', error);
          alert('Something went wrong');
        }
      });
    } else {
      console.log('wrong try again');
      
      this.signupForm.markAllAsTouched();
    }
  }
}
