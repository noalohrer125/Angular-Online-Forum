import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from "./navigationbar/navigationbar.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./content/home/home.component";
import { PostsComponent } from "./content/posts/posts.component";
import { MyAccountComponent } from "./content/my-account/my-account.component";
import { PostComponent } from "./content/posts/post/post.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationbarComponent,
    HeaderComponent,
    HomeComponent,
    PostsComponent,
    MyAccountComponent,
    PostComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
