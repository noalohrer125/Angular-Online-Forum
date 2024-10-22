import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-new-answer',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-answer.component.html',
  styleUrl: './new-answer.component.css'
})
export class NewAnswerComponent {
  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  post_id: number = Number(localStorage.getItem('current_post'));

  answerForm = new FormGroup({
    content: new FormControl(''),
  })

  onSubmit() {
    const answer = {
      id: 0,
      Content: this.answerForm.value.content ?? '', // Provide a default value of '' if content is null or undefined
      Post_id: this.post_id,
    };

    this.apiService.addAnswer(answer).subscribe((response: any) => {
      if (response.error_message) {
        window.alert('failed to add new Answer, try again later')
      }
      else {
        window.location.href = '/post-details/' + this.post_id;
      }
    });
  }
}
