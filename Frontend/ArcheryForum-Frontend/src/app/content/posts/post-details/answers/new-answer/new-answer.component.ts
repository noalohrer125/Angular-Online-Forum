import { Component } from '@angular/core';
import { Answer, Post } from '../../../../../shared/interfaces';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../../../post.service';

@Component({
  selector: 'app-new-answer',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './new-answer.component.html',
  styleUrl: './new-answer.component.css'
})
export class NewAnswerComponent {
  answers: Answer[] = [];
  
  CurrentPostId = Number(localStorage.getItem('CurrentPost'))

  ngOnInit() {
    this.answers = JSON.parse(localStorage.getItem('Ansewers') || '[]')
  }

  content!: string;
  id!: number;
  post_id!: number;

  onSubmit() {
    let Answers = JSON.parse(localStorage.getItem('Answers') || '[]');

    this.post_id = Number(localStorage.getItem('CurrentPost'))

    let status = 'used';
    let x = 0;

    while (status === 'used') {
      let found = false;
      Answers.forEach((i: Answer) => {
        if (i.id === x) {
          x++;
          found = true;
        }
      });

      if (!found) {
        status = 'free';
        this.id = x
      }
    }

    const answer: Answer = {
      id: this.id,
      content: this.content,
      user_name: 'testuser',
      post_id: this.post_id,
    };

    Answers.push(answer);

    localStorage.setItem('Answers', JSON.stringify(Answers));

    window.location.href = '/post-details/' + this.post_id;
  }
}
