import { Component, input } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    AnswersComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  postId = input.required()

  constructor(private apiService: ApiService) { }

  postIdNumber!: number;

  subject!: string;
  userName!: string;
  avatar!: any;
  user: boolean = false;
  content!: string;
  likes!: number;
  dislikes!: number;
  
  is_superuser: boolean = false;
  is_authorised: boolean = false;

  ngOnInit() {
    this.postIdNumber = Number(this.postId());

    this.apiService.getSpecificPost(this.postIdNumber).subscribe(response => {
      if (response.error_message) {
        window.alert('we have issues with our servers, try again later')
      }
      else {
        this.subject = response.post.Subject
        this.apiService.getSpecificUser(response.post.User).subscribe(data => {
          this.userName = data.User[1]
          this.avatar = data.User[2]
          console.log('data.User ', data.User)
          this.apiService.current_user().subscribe((response: any) => {
            this.is_superuser = response.is_superuser
            if (response.username !== '') {
              this.user = true
            }
            if (this.userName === response.username) {
              this.is_authorised = true
            }
          })
        })
        this.content = response.post.Content
        this.likes = response.post.likes_count
        this.dislikes = response.post.dislikes_count
      }
    });
  }

  delete() {
    this.apiService.deletePost(this.postIdNumber).subscribe(response => {
      if (response.error_message) {
        window.alert('failed to delete Post, try again later')
      }
      else {
        window.location.href = '/posts';
      }
    })
  }

  vote_up() {
    if (!this.user) {
      window.alert('You have to loggin to like a post!')
      return
    }
    const voting = 'up'
    this.apiService.votePost(voting, this.postIdNumber).subscribe(response => {
      location.reload()
    })
  }

  vote_down() {
    if (!this.user) {
      window.alert('You have to loggin to dislike a post!')
      return
    }
    const voting = 'down'
    this.apiService.votePost(voting, this.postIdNumber).subscribe(response => {
      location.reload()
    })
  }
}
