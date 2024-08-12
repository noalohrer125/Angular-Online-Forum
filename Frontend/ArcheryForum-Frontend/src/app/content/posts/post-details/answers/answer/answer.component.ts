import { Component, Input } from '@angular/core';
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

  @Input() answer?: any;
  Answers!: any[];

  delete(answer_id: number) {
    // delete answer
    // ...
  }

  edit(id: number) {
    window.location.href = '/edit-answer/' + id
  }
}
