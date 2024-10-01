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
    this.apiService.getSpecificTopic(this.post.Topic).subscribe(response => {
      this.apiService.getSpecificUser(this.post.User).subscribe(data => {
        this.user_name = data.User[1]
      })
      this.topic = response.name
      this.subject = this.post.Subject
    });
  }
}
