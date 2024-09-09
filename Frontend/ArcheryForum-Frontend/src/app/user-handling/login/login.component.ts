import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

interface UserResponse {
  user: string;
}

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
export class LoginComponent {
  constructor(private apiService: ApiService) {}

  name!: string;
  password!: string;

  onSubmit() {
    const user = {
      name: this.name,
      password: this.password,
    };

    this.apiService.login(user).subscribe();
    
    window.location.href = '/home';
  }
}
