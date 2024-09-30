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
    this.apiService.logout().subscribe((response : any) => {
      if (response.message) {
        window.alert(response.message)
        window.location.href = '/home'
      }
      if (response.error_message) {
        window.alert('we have issues with our servers, try again later')
        window.location.href = '/home'
      }
    })
  }
}
