import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { RouterLink } from '@angular/router';
import { NewPostComponent } from "./new-post/new-post.component";
import { CommonModule } from '@angular/common';
import { Post } from '../../shared/interfaces';
import { ApiService } from '../../api.service';

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
  styleUrl: './posts.component.css',
})

export class PostsComponent {
  constructor(private apiService: ApiService) {}

  Posts!: Post[];

  ngOnInit() {
    this.apiService.getPosts().subscribe(response => {
      this.Posts = response.Posts
    })

    // set current_post
    // localStorage.setItem('CurrentPost', JSON.stringify(NaN))
  }
}
