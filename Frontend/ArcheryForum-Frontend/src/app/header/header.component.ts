import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private apiService: ApiService) {}

  current_user!: string;
  
  ngOnInit() {
    this.apiService.current_user().subscribe((response: any) => {
      this.current_user = response.User

      this.current_user = 'test'
    });
  }
}
