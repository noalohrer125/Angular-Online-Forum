import { Component, input } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { Answer, Post } from '../../../shared/interfaces';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    AnswersComponent,
    RouterLink,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  constructor(private apiService: ApiService) {}

  postId = input.required<string>()
  post_id_number!: number;
  Posts!: Post[];
  post!: Post;
  
  // get curren post
  // ...
  
  ngOnInit() {
    this.apiService.getPosts().subscribe(response => {
      this.Posts = response.Posts
    })

    this.post_id_number= Number(this.postId())
    this.post = this.Posts.filter(item => item.id === this.post_id_number)[0]

    // set current Post
    // ...
  }

  delete_post() {
    // delete Post

    // delete all answers to specific post
  }

  delete() {
    window.location.href = '/posts';

    this.delete_post()
  }
  
}
