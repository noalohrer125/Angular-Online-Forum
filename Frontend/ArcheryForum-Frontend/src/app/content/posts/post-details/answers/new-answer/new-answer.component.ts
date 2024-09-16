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

  ngOnInit() {}

  content!: string;
  post_id: number = Number(localStorage.getItem('current_post'));

  onSubmit() {
    const answer = {
      id: 0,
      content: this.content,
      post_id: this.post_id,
    };

    this.apiService.addAnswer(answer).subscribe();

    window.location.href = '/post-details/' + this.post_id;
  }
}
