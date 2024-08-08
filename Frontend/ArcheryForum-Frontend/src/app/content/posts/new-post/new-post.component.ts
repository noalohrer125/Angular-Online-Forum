import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  

  topics!: any[];

  ngOnInit() {
    this.apiService.getTopics().subscribe(response => {
      this.topics = response;
    });
  }

  cancel() {
    window.location.href = '/posts'
  }

  subject!: string;
  content!: string;
  topic!: string;

  onSubmit() {
    const post = {
      subject: this.subject,
      content: this.content,
      topic_name: this.topic,
    };

    this.apiService.addPost(post).subscribe();
    window.location.href = '/posts';
  }
}
