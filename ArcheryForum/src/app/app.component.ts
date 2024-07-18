import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from "./navigationbar/navigationbar.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./content/home/home.component";
import { PostsComponent } from "./content/posts/posts.component";
import { MyAccountComponent } from "./content/my-account/my-account.component";
import { PostComponent } from "./content/posts/post/post.component";
import { CommonModule } from '@angular/common';
import { Answer, Post, Topic } from './shared/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationbarComponent,
    HeaderComponent,
    FooterComponent,
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
  title = 'ArcheryForum';

  Post?: Post = {
    id: 1,
    subject: '',
    content: '',
    date: new Date(),
    user_id: 1,
    topic_id: 1,
  }

  Answer?: Answer = {
    id: 1,
    content: '',
    user_id: 1,
    post_id: 1,
  }

  Topic?: Topic = {
    id: 1,
    name: 'test',
    description: '',
  }

  constructor() {

  }

  ngOnInit() {
    this.setLocalStorage()
  }

  setLocalStorage() {
    localStorage.setItem('Posts', JSON.stringify([this.Post]));
    localStorage.setItem('Answers', JSON.stringify([this.Answer]));
    localStorage.setItem('Topics', JSON.stringify([this.Topic]));
  }
}
