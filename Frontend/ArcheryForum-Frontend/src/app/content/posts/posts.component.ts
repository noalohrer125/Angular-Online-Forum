import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { RouterLink } from '@angular/router';
import { NewPostComponent } from "./new-post/new-post.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { current_user, Post, sort_order } from '../../interfaces';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    PostComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})

export class PostsComponent {
  constructor(private apiService: ApiService) { }
  Posts!: Post[];
  noPosts!: boolean;
  current_user!: current_user;
  is_superuser!: boolean;
  is_authenticated!: boolean;

  ngOnInit() {
    const validSortOrders: sort_order[] = ['asc-topic', 'desc-topic', 'asc-voting', 'desc-voting', 'default'];

    const storedSortOrder = localStorage.getItem('sort_order');

    // Check if the value is valid and assign, otherwise default to 'default'
    const sort_order: sort_order = validSortOrders.includes(storedSortOrder as sort_order) ? (storedSortOrder as sort_order) : 'default';

    this.apiService.getPosts(sort_order).subscribe(response => {
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

    this.apiService.current_user().subscribe((response: any) => {
      this.current_user = response
      this.is_superuser = response.is_superuser
    })
    this.apiService.is_authenticated().subscribe((response: any) => {
      this.is_authenticated = response.authenticated
    })
  }

  currentPost(post_id: number) {
    localStorage.setItem('current_post', JSON.stringify(post_id))
  }

  sortPosts(sort_order: sort_order) {
    localStorage.setItem('sort_order', sort_order)
    window.location.reload()
  }
}
