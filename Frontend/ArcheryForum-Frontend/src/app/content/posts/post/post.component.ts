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

  topic_name!: any;

  ngOnInit() {

    this.apiService.getSpecificTopic(this.post.Topic_id).subscribe(response => {
      this.topic_name = response.name;

      // this.name = this.post.user_name
      this.topic = this.topic_name
      this.subject = this.post.Subject
    });
  }
}
