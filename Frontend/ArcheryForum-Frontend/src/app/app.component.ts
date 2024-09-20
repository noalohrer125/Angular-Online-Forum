import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from "./navigationbar/navigationbar.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./content/home/home.component";
import { PostsComponent } from "./content/posts/posts.component";
import { PostComponent } from "./content/posts/post/post.component";
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationbarComponent,
    HeaderComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private apiService: ApiService) { }

  status!: any;
  backend_is_running!: boolean;

  ngOnInit() {
    this.apiService.getRunningBackend().subscribe(response => {
      this.backend_is_running = response
      console.log('runningBackend: ', this.backend_is_running)
    })
  }
}
