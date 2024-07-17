import { Component } from '@angular/core';
import { AnswerComponent } from "./answer/answer.component";
import { NewAnswerComponent } from "./new-answer/new-answer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    AnswerComponent,
    NewAnswerComponent,
    RouterLink,
],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.css'
})
export class AnswersComponent {

}
