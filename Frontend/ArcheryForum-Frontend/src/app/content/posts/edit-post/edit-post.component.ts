import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  constructor(private apiService: ApiService) {}

  CurrentPostId = input.required<string>()
  topics: any;

  ngOnInit() {
    this.apiService.getTopics().subscribe(response => {
      console.log('data: ' + response)
      this.topics = response;
    });

    // fill edit-form with data of current-post
      // this.subject = CurrentPost!.subject
      // this.content = CurrentPost!.content
      // this.topic = CurrentPost!.topic_name
  }

  // delete old post
  delete_post() {
    // delete Post
    // ...

    // delete all answers to specific post
    // ...
  }

  // post-propertys from edit-form
  subject!: string;
  content!: string;
  topic!: string;

  onSubmit() {
    this.delete_post()

    const post = {
      subject: this.subject,
      content: this.content,
      user_name: 'testuser',
      topic_name: this.topic,
    };

    window.location.href = '/posts';
  }
}
