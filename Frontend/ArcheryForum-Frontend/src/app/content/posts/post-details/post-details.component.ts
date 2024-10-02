import { Component, input } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';

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
  content!: string;
  
  is_superuser: boolean = false;
  is_authoriced: boolean = false;

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

          this.apiService.current_user().subscribe((response: any) => {
            this.is_superuser = response.is_superuser
            if (this.userName === response.username) {
              this.is_authoriced = true
            }
          })
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
