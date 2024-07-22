import { Component, input } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { Post } from '../../../shared/interfaces';
import { PostService } from '../../../post.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    AnswersComponent,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  postId = input.required<string>()
  post_id!: number;
  Posts: Post[] = JSON.parse(localStorage.getItem('Posts') || '[]');
  post!: Post;

  ngOnInit() {
    this.post_id= Number(this.postId())
    this.post = this.Posts[this.post_id]

    localStorage.setItem('CurrentPost', JSON.stringify(this.post_id))
  }
}
