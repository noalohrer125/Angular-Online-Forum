import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { ApiService } from '../../../services/api.service';
import { Post } from '../../../interfaces';

@Component({
  selector: 'app-liked-posts',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    PostComponent,

  ],
  templateUrl: './liked-posts.component.html',
  styleUrl: './liked-posts.component.css'
})
export class LikedPostsComponent {
  constructor(private apiService: ApiService) { }
  Posts!: Post[];
  noPosts!: boolean;

  ngOnInit() {
    this.apiService.getLikedPosts().subscribe(response => {
      if (response && response.length > 0) {
        this.Posts = response;
        this.noPosts = false
      }
      else if (response.error_message) {
        window.alert('we have issues to reach our servers, try again later')
      }
      else {
        this.noPosts = true
      }
    });
  }


  currentPost(post_id: number) {
    localStorage.setItem('current_post', JSON.stringify(post_id))
  }
}
