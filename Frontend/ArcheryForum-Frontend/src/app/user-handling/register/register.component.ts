import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  name!: string;
  password!: string;
  csrfToken!: string;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the CSRF token on initialization
    this.apiService.getCsrfToken().subscribe(response => {
      this.apiService.setCsrfToken(response.csrfToken);  // Save CSRF token for future requests
    });
  }

  onSubmit(): void {
    const user = {
      name: this.name,
      password: this.password,
    };

    this.apiService.signUp(user).subscribe(response => {
      if (response.message === 'User created successfully.') {
        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      } else {
        console.log('Registration failed:', response.error);
      }
    });
  }
}
