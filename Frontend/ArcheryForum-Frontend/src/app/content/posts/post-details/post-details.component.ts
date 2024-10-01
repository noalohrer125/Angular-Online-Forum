import { Component, input } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    AnswersComponent,
    RouterLink,
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
  content!: string;

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
        })
        this.content = response.post.Content
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
}
