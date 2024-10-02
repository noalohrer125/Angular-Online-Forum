import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch the CSRF token on initialization
    this.apiService.getCsrfToken().subscribe(response => {
      this.apiService.setCsrfToken(response.csrfToken);  // Save CSRF token for future requests
    });
  }

  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit(): void {
    const user = {
      name: this.loginForm.value.name,
      password: this.loginForm.value.password,
    };

    this.apiService.login(user).subscribe(response => {
      if (response.message === 'Login successful') {
        window.location.href = '/home'
      } else {
        if (response.error) {
          window.alert(response.error);
        }
        if (response.error_message) {
          window.alert('we have issues with our loginserver, try again later')
        }
      }
    });
  }
}
