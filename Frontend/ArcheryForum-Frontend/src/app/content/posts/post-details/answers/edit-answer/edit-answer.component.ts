import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../../api.service';

@Component({
  selector: 'app-edit-answer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './edit-answer.component.html',
  styleUrl: './edit-answer.component.css'
})
export class EditAnswerComponent {
  constructor(private apiService: ApiService) {}

  CurrentAnswerId = input.required<string>()

  content!: string;
  post_id: number = Number(localStorage.getItem('current_post'));

  ngOnInit() {
    this.apiService.getSpecificAnswer(Number(this.CurrentAnswerId())).subscribe(data => {
      this.content = data.answer.Content
    });
  }

  onSubmit() {
    const answer = {
      id: Number(this.CurrentAnswerId()),
      content: this.content,
    };

    this.apiService.editAnswer(answer).subscribe(value => {
      if (value) {
        window.location.href = '/post-details/' + this.post_id;
      }
      else {
        console.log('An error occured, please try again later.')
      }
    });
  }
}
