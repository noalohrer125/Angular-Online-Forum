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
  constructor(private apiService: ApiService) {}

  @Input() answer?: any;
  Answers!: any[];

  delete(answer_id: number) {
    this.apiService.deleteAnswer(answer_id).subscribe()
    
    location.reload()
  }

  edit(id: number) {
    window.location.href = '/edit-answer/' + id
  }
}
