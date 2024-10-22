import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { Answer } from '../../../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  constructor(private apiService: ApiService) {}
  @Input() answer?: any;
  Answers!: Answer[];

  UserName!: string;
  avatar!: any;
  user: boolean = false;
  Content!: string;
  likes!: number;
  dislikes!: number;

  is_superuser: boolean = false;
  is_authoriced: boolean = false;

  ngOnInit() {
    this.apiService.getSpecificUser(this.answer.User).subscribe(data => {
      this.UserName = data.User[1]
      this.avatar = data.User[2]
      
      this.apiService.current_user().subscribe((response: any) => {
        this.is_superuser = response.is_superuser
        if (response.username !== '') {
          this.user = true
        }
        if (this.UserName === response.username) {
          this.is_authoriced = true
        }
      })
      this.Content = this.answer.Content
    })

    console.log(this.answer)

    this.likes = this.answer.liked_by_count
    this.dislikes = this.answer.disliked_by_count
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

  vote_up() {
    if (!this.user) {
      window.alert('You have to loggin to like an answer!')
      return
    }
    const voting = 'up'
    this.apiService.voteAnswer(voting, this.answer.id).subscribe(response => {
      location.reload()
    })
  }

  vote_down() {
    if (!this.user) {
      window.alert('You have to loggin to dislike an answer!')
      return
    }
    const voting = 'down'
    this.apiService.voteAnswer(voting, this.answer.id).subscribe(response => {
      location.reload()
    })
  }
}
