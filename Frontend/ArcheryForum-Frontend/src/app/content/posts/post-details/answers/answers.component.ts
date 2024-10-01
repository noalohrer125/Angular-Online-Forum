import { Component } from '@angular/core';
import { AnswerComponent } from "./answer/answer.component";
import { NewAnswerComponent } from "./new-answer/new-answer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { Answer } from '../../../../interfaces';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [
    AnswerComponent,
    NewAnswerComponent,
    RouterLink,
    CommonModule,
],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.css'
})
export class AnswersComponent {
  constructor(private apiService: ApiService) {}
  Answers!: any[];
  // current post id
  post_id: number = Number(localStorage.getItem('current_post'));
  
  is_authenticated!: boolean;

  ngOnInit() {
    this.apiService.is_authenticated().subscribe((response: any) => {
      this.is_authenticated = response.authenticated
    })

    this.apiService.getAnswers().subscribe(response => {
      if (response.error_message) {
        window.alert('we can not reach our servers, try again later')
      }
      else {
        this.Answers = response
        this.Answers = this.Answers.filter(item => item.Post === this.post_id);
      }
    })
  }
}
