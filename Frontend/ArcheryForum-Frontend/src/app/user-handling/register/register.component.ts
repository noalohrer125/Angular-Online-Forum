import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) { }

  csrfToken!: string;

  ngOnInit(): void {
    // Fetch the CSRF token on initialization
    this.apiService.getCsrfToken().subscribe(response => {
      this.apiService.setCsrfToken(response.csrfToken);  // Save CSRF token for future requests
    });
  }

  registerForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit(): void {
    const user = {
      name: this.registerForm.value.name,
      password: this.registerForm.value.password,
    };

    this.apiService.signUp(user).subscribe(response => {
      if (response.message === 'User created successfully.') {
        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      } else {
        window.alert('Registration failed:' + String(response.error));
      }
    });
  }
}
