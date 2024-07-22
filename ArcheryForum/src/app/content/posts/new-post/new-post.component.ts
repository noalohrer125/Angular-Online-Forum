import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Post, Topic } from '../../../shared/interfaces';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  topics: Topic[] = [];

  ngOnInit() {
    this.topics = JSON.parse(localStorage.getItem('Topics') || '')
  }

  cancel() {
    window.location.href = '/posts'
  }

  subject!: string;
  content!: string;
  topic!: string;
  id!: number;
  date = new Date()

  onSubmit() {
    let Posts = JSON.parse(localStorage.getItem('Posts') || '[]');

    const post: Post = {
      id: Posts.length,
      subject: this.subject,
      content: this.content,
      date: this.date.toLocaleDateString(),
      user_name: 'testuser',
      topic_name: this.topic,
    };

    Posts.push(post);

    localStorage.setItem('Posts', JSON.stringify(Posts));

    window.location.href = '/posts';
  }
}
