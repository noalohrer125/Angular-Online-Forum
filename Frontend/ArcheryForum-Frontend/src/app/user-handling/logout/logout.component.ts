import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.logout().subscribe(() => {
      window.alert('user logged out.')
      window.location.href = '/home'
    })
  }
}
