import { Component, input } from '@angular/core';
import { Answer } from '../../../../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-answer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-answer.component.html',
  styleUrl: './edit-answer.component.css'
})
export class EditAnswerComponent {
  CurrentAnswerId = input.required<string>()
  answers!: Answer[];
  Answers!: Answer[];

  content!: string;
  id!: number;
  post_id!: number;

  ngOnInit() {
    this.answers = JSON.parse(localStorage.getItem('Answers') || '[]');
    const CurrentAnswer = this.answers.find((item: Answer) => item.id === Number(this.CurrentAnswerId()))
    
    this.content = String(CurrentAnswer!.content)
  }

  cancel() {
    window.location.href = '/post-details/' + Number(localStorage.getItem('CurrentPost'))
  }

  delete(answer_id: number) {
    const post_id: number = Number(localStorage.getItem('CurrentPost'))

    const Answers: Answer[] = JSON.parse(localStorage.getItem('Answers') || '[]');

    const id: number = answer_id

    this.Answers = Answers.filter(item => item.id !== id);

    localStorage.setItem('Answers', JSON.stringify(this.Answers))

    window.location.href = '/post-details/' + post_id;
  }

  onSubmit() {
    this.delete(Number(this.CurrentAnswerId()))

    let Answers = JSON.parse(localStorage.getItem('Answers') || '[]');

    this.post_id = Number(localStorage.getItem('CurrentPost'))

    let status = 'used';
    let x = 0;

    while (status === 'used') {
      let found = false;
      Answers.forEach((i: Answer) => {
        if (i.id === x) {
          x++;
          found = true;
        }
      });

      if (!found) {
        status = 'free';
        this.id = x
      }
    }

    const answer: Answer = {
      id: this.id,
      content: this.content,
      user_name: 'testuser',
      post_id: this.post_id,
    };

    Answers.push(answer);

    localStorage.setItem('Answers', JSON.stringify(Answers));

    window.location.href = '/post-details/' + this.post_id;
  }
}
