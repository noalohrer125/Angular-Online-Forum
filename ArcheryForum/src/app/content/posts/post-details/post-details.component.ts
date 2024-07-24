import { Component, input } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { Answer, Post } from '../../../shared/interfaces';

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

  edit() {
    const CurrentPost: number = Number(localStorage.getItem('CurrentPost'))
    window.location.href = '/edit-post/' + CurrentPost
  }
}
