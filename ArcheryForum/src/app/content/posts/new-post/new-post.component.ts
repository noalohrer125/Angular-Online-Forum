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

  id!: number;
  subject!: string;
  content!: string;
  topic!: string;
  date = new Date()

  onSubmit() {
    let Posts = JSON.parse(localStorage.getItem('Posts') || '[]');

    let status = 'used';
    let x = 0;

    while (status === 'used') {
      let found = false;
      Posts.forEach((i: Post) => {
        if (i.id === x) {
          x++;
          found = true;
        }
      });

      if (!found) {
        status = 'free';
        this.id = x
      }
    }

    const post: Post = {
      id: this.id,
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
