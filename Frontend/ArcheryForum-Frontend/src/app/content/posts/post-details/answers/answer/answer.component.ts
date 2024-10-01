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
  @Input() answer?: any;
  Answers!: Answer[];

  UserName!: string;
  Content!: string;

  ngOnInit() {
    this.apiService.getSpecificUser(this.answer.User).subscribe(data => {
      this.UserName = data.User[1]
      this.Content = this.answer.Content
    })
  }

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
