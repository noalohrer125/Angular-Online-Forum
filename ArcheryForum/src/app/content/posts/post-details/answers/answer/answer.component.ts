import { Component, Input } from '@angular/core';
import { Answer } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  @Input() answer?: Answer;
  Answers!: Answer[];

  delete(answer_id: number) {
    const post_id: number = Number(localStorage.getItem('CurrentPost'))

    const Answers: Answer[] = JSON.parse(localStorage.getItem('Answers') || '[]');

    const id: number = answer_id

    this.Answers = Answers.filter(item => item.id !== id);

    localStorage.setItem('Answers', JSON.stringify(this.Answers))

    window.location.href = '/post-details/' + post_id;
  }

  edit(id: number) {
    window.location.href = '/edit-answer/' + id
  }
}
