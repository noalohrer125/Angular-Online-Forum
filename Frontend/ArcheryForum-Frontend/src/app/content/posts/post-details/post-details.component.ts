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
  post!: any;

  subject!: string;
  // user_name!: string;
  content!: string;

  ngOnInit() {
    this.post_id_number = Number(this.postId());

    this.apiService.getSpecificPost(this.post_id_number).subscribe(response => {
      this.post = response;

      this.subject = response.subject
      this.content = response.content
      console.log('done till here')
    });
  }

  delete() {
    window.location.href = '/posts';

    // delete post with all related answers
    // ...
  }
}
