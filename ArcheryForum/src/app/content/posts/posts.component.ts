import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { RouterLink } from '@angular/router';
import { NewPostComponent } from "./new-post/new-post.component";
import { CommonModule, JsonPipe } from '@angular/common';
import { Post } from '../../shared/interfaces';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    PostComponent,
    RouterLink,
    NewPostComponent,
    CommonModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent {
  Posts = JSON.parse(localStorage.getItem('Posts') || '[]');

  ngOnInit() {
    localStorage.setItem('CurrentPost', JSON.stringify(NaN))
  }
}
