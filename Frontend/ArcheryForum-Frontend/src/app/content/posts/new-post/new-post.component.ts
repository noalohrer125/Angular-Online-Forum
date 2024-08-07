import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Post, Topic } from '../../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  constructor(private apiService: ApiService) {}

  topics: Topic[] = [];

  ngOnInit() {
    this.apiService.getTopics().subscribe(response => {
      this.topics = response.Topics;
    })
  }

  cancel() {
    window.location.href = '/posts'
  }

  subject!: string;
  content!: string;
  topic!: string;

  onSubmit() {
    this.apiService.getTopics().subscribe()
    const post = {
      subject: this.subject,
      content: this.content,
      topic_name: this.topic,
    };

    window.location.href = '/posts';
  }
}
