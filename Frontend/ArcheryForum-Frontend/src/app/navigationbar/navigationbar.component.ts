import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css',
})
export class NavigationbarComponent {
  constructor(private apiService: ApiService) {}

  isAuthenticated!: any;
  
  ngOnInit() {
    this.apiService.is_authenticated().subscribe((response: any) => {
      this.isAuthenticated = response.authenticated
    })
  }
}
