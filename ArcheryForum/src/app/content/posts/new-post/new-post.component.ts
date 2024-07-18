import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Topic, Post } from '../../../shared/interfaces';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  topics: Topic[] = [];
  topics_name = ['test1', 'test2'];

  ngOnInit() {
    this.topics = JSON.parse(localStorage.getItem('Topics') || '')
  }

  submit() {
    let Subjectinput
    let ContentInput
    let TopicInput

    const SubjectinputElement = document.getElementById('Subject') as HTMLInputElement | null;
    if (SubjectinputElement) {
      Subjectinput = SubjectinputElement.value;
    } else {
      Subjectinput = ''
    }

    const ContentInputElement = document.getElementById('Content') as HTMLInputElement | null;
    if (ContentInputElement) {
      ContentInput = ContentInputElement.value;
    } else {
      ContentInput = ''
    }

    const TopicInputElement = document.getElementById('Topic') as HTMLInputElement | null;
    if (TopicInputElement) {
      TopicInput = TopicInputElement.value;
    } else {
      TopicInput = ''
    }

    let post_id = 1
    let subject = Subjectinput
    let content = ContentInput
    let date = new Date()
    let user_id = 1
    let topic_id = +TopicInput

    const post: Post = {
      id: post_id,
      subject: subject,
      content: content,
      date: date,
      user_id: user_id,
      topic_id: topic_id,
    };

    let Posts = JSON.parse(localStorage.getItem('Posts') || '[]');

    Posts.push(post);

    localStorage.setItem('Posts', JSON.stringify(Posts));

    window.location.href = '/posts';
  }
}
