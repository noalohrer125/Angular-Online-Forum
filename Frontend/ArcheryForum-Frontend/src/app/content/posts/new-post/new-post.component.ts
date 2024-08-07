import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Post, Topic } from '../../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';

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
  constructor(private apiService: ApiService, private httpClient: HttpClient) {}
  

  topics: any;

  ngOnInit() {
    this.httpClient.get('http://localhost:8000/get_topics/').subscribe(Response => {
      this.topics = Response;
    })

    console.log(this.topics)
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

    this.apiService.addPost(post).subscribe(response => {
      console.log('Post added successfully', response);
      window.location.href = '/posts';
    }, error => {
      console.error('Error adding post', error);
    });
  }
}
