import { Component } from '@angular/core';
import { Answer, Post } from '../../../../../shared/interfaces';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../../api.service';

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
  constructor(private apiservice: ApiService) {}

  Answers: Answer[] = [];
  
  CurrentPostId!: Number;

  ngOnInit() {
    this.apiservice.getAnswers().subscribe(response => {
      this.Answers = response.Answers
    })
  }

  content!: string;
  id!: number;
  // curren post id
  post_id!: number;

  onSubmit() {
    let Answers = this.Answers

    const answer = {
      content: this.content,
      post_id: this.post_id,
    };

    window.location.href = '/post-details/' + this.post_id;
  }
}
