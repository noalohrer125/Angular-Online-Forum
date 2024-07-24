import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Answer, Post, Topic } from '../../../shared/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  CurrentPostId = input.required<string>()
  Posts: Post[] = JSON.parse(localStorage.getItem('Posts') || '[]');
  topics: Topic[] = [];

  ngOnInit() {
    this.topics = JSON.parse(localStorage.getItem('Topics') || '')

    let CurrentPost = this.Posts.find((item: Post) => item.id === Number(this.CurrentPostId()))

    this.subject = CurrentPost!.subject
    this.content = CurrentPost!.content
    this.topic = CurrentPost!.topic_name
  }

  // cancel edit
  cancel() {
    window.location.href = '/post-details/' + this.CurrentPostId()
  }

  // delete old post
  Answers!: Answer[];

  delete_post() {
    // delete Post
    const id: number = Number(localStorage.getItem('CurrentPost'))

    this.Posts = this.Posts.filter(item => item.id !== id);
    localStorage.setItem('Posts', JSON.stringify(this.Posts))

    // delete all answers to specific post
    const Answers: Answer[] = JSON.parse(localStorage.getItem('Answers') || '[]');

    this.Answers = Answers.filter(item => item.post_id !== id);
    localStorage.setItem('Answers', JSON.stringify(this.Answers))
  }

  // post-propertys from edit-form
  id!: number;
  subject!: string;
  content!: string;
  topic!: string;
  date = new Date()

  onSubmit() {
    this.delete_post()

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
