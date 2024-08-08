import { Component, Input } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post?: any
  constructor(private apiService: ApiService) {}

  // name!: string;
  topic: string = 'test';
  subject!: string;

  topics!: any[];

  topic_name!: string;

  ngOnInit() {
    this.apiService.getSpecificTopic(this.post.id).subscribe(data => {
      this.topic_name = data;
    });

    console.log(this.topics)

    // this.name = this.post.user_name
    this.topic = this.post.Topic_id
    this.subject = this.post.Subject
  }
}
