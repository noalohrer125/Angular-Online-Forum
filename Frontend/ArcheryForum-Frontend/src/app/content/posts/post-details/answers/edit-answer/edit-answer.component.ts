import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-edit-answer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-answer.component.html',
  styleUrl: './edit-answer.component.css'
})
export class EditAnswerComponent {
  CurrentAnswerId = input.required<string>()

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSpecificAnswer(Number(this.CurrentAnswerId())).subscribe(data => {
      this.editAnswer.patchValue({
        content: data.answer.Content
      })
    });
  }

  post_id: number = Number(localStorage.getItem('current_post'));

  editAnswer = new FormGroup({
    content: new FormControl
  })

  onSubmit() {
    const answer = {
      id: Number(this.CurrentAnswerId()),
      Content: this.editAnswer.value.content,
      Post_id: this.post_id,
    };

    this.apiService.editAnswer(answer).subscribe(response => {
      if (response.error_message) {
        window.alert('an error occured, try again later')
      }
      else {
        if (response) {
          window.location.href = '/post-details/' + this.post_id;
        }
        console.log('An error occured, please try again later.')
      }
    });
  }
}
