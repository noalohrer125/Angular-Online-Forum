import { Component, input } from '@angular/core';
import { Answer } from '../../../../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../../api.service';

@Component({
  selector: 'app-edit-answer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './edit-answer.component.html',
  styleUrl: './edit-answer.component.css'
})
export class EditAnswerComponent {
  constructor(private apiservice: ApiService) {}

  CurrentAnswerId = input.required<string>()
  Answers!: Answer[];

  content!: string;
  id!: number;
  // current post id
  post_id!: number;

  ngOnInit() {
    this.apiservice.getAnswers().subscribe(response => {
      this.Answers = response.Answers
    })

    const CurrentAnswer = this.Answers.find((item: Answer) => item.id === Number(this.CurrentAnswerId()))
    
    this.content = String(CurrentAnswer!.content)
  }

  delete(answer_id: number) {
    // delete answer
    // ...

    window.location.href = '/post-details/' + this.post_id;
  }

  onSubmit() {
    this.delete(Number(this.CurrentAnswerId()))

    const answer = {
      content: this.content,
      post_id: this.post_id,
    };

    window.location.href = '/post-details/' + this.post_id;
  }
}
