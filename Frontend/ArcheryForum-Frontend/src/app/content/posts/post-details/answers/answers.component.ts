import { Component } from '@angular/core';
import { AnswerComponent } from "./answer/answer.component";
import { NewAnswerComponent } from "./new-answer/new-answer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Answer } from '../../../../shared/interfaces';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    AnswerComponent,
    NewAnswerComponent,
    RouterLink,
    CommonModule,
],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.css'
})
export class AnswersComponent {
  constructor(private apisercive: ApiService) {}

  Answers!: Answer[];
  // current post id
  post_id!: number;

  ngOnInit() {
    this.apisercive.getAnswers().subscribe(response => {
      this.Answers = response

      console.log(this.Answers)
    })
    

    this.Answers = this.Answers.filter(item => item.post_id === this.post_id);
  }
}
