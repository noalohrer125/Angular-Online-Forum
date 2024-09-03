import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
export class RegisterComponent {
  constructor(private apiService: ApiService) {}

  name!: string;
  password!: string;

  onSubmit() {
    const user = {
      name: this.name,
      password: this.password,
    };

    this.apiService.sign_up(user).subscribe();
    window.location.href = '/login';
  }
}
