import { Component, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post?: Post;

  name!: string;
  topic!: string;
  subject!: string;

  ngOnInit() {
    this.name = this.post!.user_name
    this.topic = this.post!.topic_name
    this.subject = this.post!.subject
  }
}
