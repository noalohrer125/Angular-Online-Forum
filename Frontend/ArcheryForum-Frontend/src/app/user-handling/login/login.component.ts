import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  name!: string;
  password!: string;

  ngOnInit(): void {
    // Fetch the CSRF token on initialization
    this.apiService.getCsrfToken().subscribe(response => {
      this.apiService.setCsrfToken(response.csrfToken);  // Save CSRF token for future requests
    });
  }


  onSubmit(): void {
    const user = {
      name: this.name,
      password: this.password
    };

    this.apiService.login(user).subscribe(response => {
      if (response.message === 'Login successful') {
        // Store the user in localStorage or handle login state
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/home'
      } else {
        window.alert(response.error);
      }
    });
  }
}
