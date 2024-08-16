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

  post_id_number!: number;

  subject!: string;
  user_name!: string;
  content!: string;

  ngOnInit() {
    this.post_id_number = Number(this.postId());

    this.apiService.getSpecificPost(this.post_id_number).subscribe(response => {

      this.subject = response.post.Subject
      this.user_name = 'user'
      this.content = response.post.Content
    });
  }

  delete() {
      this.apiService.deletePost(this.post_id_number).subscribe()
      
      window.location.href = '/posts';
    }
}
