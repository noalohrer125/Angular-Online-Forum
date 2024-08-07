import { Component, Input } from '@angular/core';
import { Answer } from '../../../../../shared/interfaces';
import { ApiService } from '../../../../../api.service';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  constructor(private apiservice: ApiService) {}

  @Input() answer?: Answer;
  Answers!: Answer[];

  delete(answer_id: number) {
    // delete answer
    // ...
  }

  edit(id: number) {
    window.location.href = '/edit-answer/' + id
  }
}
