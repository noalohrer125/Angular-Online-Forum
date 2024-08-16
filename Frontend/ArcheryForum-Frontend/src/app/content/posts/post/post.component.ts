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

  user_name!: string;
  topic!: string;
  subject!: string;

  ngOnInit() {

    this.apiService.getSpecificTopic(this.post.Topic_id).subscribe(response => {

      this.user_name = 'this.post.user_name'
      this.topic = response.name
      this.subject = this.post.Subject
    });
  }
}
