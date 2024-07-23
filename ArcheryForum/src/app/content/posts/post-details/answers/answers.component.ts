import { Component } from '@angular/core';
import { AnswerComponent } from "./answer/answer.component";
import { NewAnswerComponent } from "./new-answer/new-answer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Answer } from '../../../../shared/interfaces';

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
  Answers: Answer[] = JSON.parse(localStorage.getItem('Answers') || '[]');

  ngOnInit() {
    const id:number = Number(localStorage.getItem('CurrentPost'))

    this.Answers = this.Answers.filter(item => item.post_id === id);
  }
}
