import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { RouterLink } from '@angular/router';
import { NewPostComponent } from "./new-post/new-post.component";
import { CommonModule } from '@angular/common';
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

  Posts!: any[];
  current_user!: any;
  is_superuser!: boolean;
  is_authenticated!: boolean;

  ngOnInit() {
    this.apiService.getPosts().subscribe(response => {
      this.Posts = response
    })
    this.apiService.current_user().subscribe((response: any) => {
      this.current_user = response
      this.is_superuser = response.is_superuser
    })
    this.apiService.is_authenticated().subscribe((response: any) => {
      this.is_authenticated = response.authenticated
    })
  }

  current_post(post_id: number) {
    localStorage.setItem('current_post', JSON.stringify(post_id))
  }
}
