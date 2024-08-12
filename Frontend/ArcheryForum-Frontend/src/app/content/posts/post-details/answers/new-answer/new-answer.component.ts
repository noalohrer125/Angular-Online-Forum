import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../../api.service';

@Component({
  selector: 'app-new-answer',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './new-answer.component.html',
  styleUrl: './new-answer.component.css'
})
export class NewAnswerComponent {
  constructor(private apiService: ApiService) {}

  Answers: any[] = [];

  ngOnInit() {
    this.apiService.getAnswers().subscribe(response => {
      this.Answers = response.Answers
    })
  }

  content!: string;
  // curren post id
  post_id!: number;

  onSubmit() {
    this.post_id = Number(localStorage.getItem('current_post'))



    const answer = {
      content: this.content,
      post_id: this.post_id,
    };

    this.apiService.addAnswer(answer).subscribe();

    window.location.href = '/post-details/' + this.post_id;
  }
}
