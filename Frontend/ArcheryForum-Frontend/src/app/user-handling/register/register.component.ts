import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) { }

  csrfToken!: string;
  avatars!: any[];

  ngOnInit(): void {
    // Fetch the CSRF token on initialization
    this.apiService.getCsrfToken().subscribe(response => {
      this.apiService.setCsrfToken(response.csrfToken);  // Save CSRF token for future requests
    });

    this.apiService.getAvatars().subscribe(response => {
      this.avatars = response
    })
  }

  registerForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    avatar: new FormControl(''),
  })

  onSubmit(): void {
    const user = {
      name: this.registerForm.value.name,
      password: this.registerForm.value.password,
      avatar: this.registerForm.value.avatar,
    };

    this.apiService.signUp(user).subscribe(
      response => {
        if (response.message === 'User created successfully.') {
          // Navigate to the login page after successful registration
          this.router.navigate(['/login']);
        } else {
          window.alert('Registration failed:' + String(response.error));
        }
      },
      error => {
        if (error.status === 400) {
          window.alert("Password doesn't have 8 characters or is to weak!")
        } else {
          window.alert('registration failed, try again later')
        }
      }
    );
  }
}
