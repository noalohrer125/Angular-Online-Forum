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

  onSubmit() {
    const post: Post = {
      id: 1,
      subject: this.subject,
      content: this.content,
      date: new Date(),
      user_id: 1,
      topic_name: this.topic,
    };

    let Posts = JSON.parse(localStorage.getItem('Posts') || '[]');

    Posts.push(post);

    localStorage.setItem('Posts', JSON.stringify(Posts));

    window.location.href = '/posts';
  }
}
