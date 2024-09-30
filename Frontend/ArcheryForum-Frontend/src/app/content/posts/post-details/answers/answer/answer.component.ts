import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../../api.service';
import { Answer } from '../../../../../interfaces';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  constructor(private apiService: ApiService) {}
  @Input() answer?: Answer;
  Answers!: Answer[];

  delete(answer_id: number) {
    this.apiService.deleteAnswer(answer_id).subscribe(response => {
      if (response.error_message) {
        window.alert('failed to delete Answer, try again later')
      }
      else {
        location.reload()
      }
    })
  }

  edit(id: number) {
    window.location.href = '/edit-answer/' + id
  }
}
