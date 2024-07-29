import { Component, input } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { Answer, Post } from '../../../shared/interfaces';
import { RouterLink } from '@angular/router';

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
  postId = input.required<string>()
  post_id!: number;
  Posts: Post[] = JSON.parse(localStorage.getItem('Posts') || '[]');
  post!: Post;
  
  CurrentPost: number = Number(localStorage.getItem('CurrentPost'))
  
  ngOnInit() {
    this.post_id= Number(this.postId())
    this.post = this.Posts.filter(item => item.id === this.post_id)[0]

    localStorage.setItem('CurrentPost', JSON.stringify(this.post_id))
  }

  Answers!: Answer[];

  delete_post() {
    // delete Post
    const Posts: Post[] = JSON.parse(localStorage.getItem('Posts') || '[]');

    const id: number = Number(localStorage.getItem('CurrentPost'))

    this.Posts = Posts.filter(item => item.id !== id);

    localStorage.setItem('Posts', JSON.stringify(this.Posts))


    // delete all answers to specific post
    const Answers: Answer[] = JSON.parse(localStorage.getItem('Answers') || '[]');

    this.Answers = Answers.filter(item => item.post_id !== id);

    localStorage.setItem('Answers', JSON.stringify(this.Answers))
  }

  delete() {
    window.location.href = '/posts';

    this.delete_post()
  }
  
}
