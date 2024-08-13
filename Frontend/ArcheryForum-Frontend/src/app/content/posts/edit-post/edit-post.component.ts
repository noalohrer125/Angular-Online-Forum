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
  
  // post-propertys for edit-form
  subject!: string;
  content!: string;
  topic!: string;
  
  ngOnInit() {
    this.apiService.getTopics().subscribe(response => {
      this.topics = response;
    });

    const post_id_number = Number(this.CurrentPostId())

    this.apiService.getSpecificPost(post_id_number).subscribe(response => {
      
      // fill edit-form with data of current-post
      this.subject = response.post.Subject
      this.content = response.post.Content
      this.apiService.getSpecificTopic(response.post.Topic_id).subscribe(data => {
        this.topic = data
      });
    });
  }

  onSubmit() {
    const post = {
      id: Number(this.CurrentPostId()),
      subject: this.subject,
      content: this.content,
      // user_name: 'user',
      topic_id: this.topic,
    };

    this.apiService.editPost(post).subscribe()
    window.location.href = '/posts';
  }
}
