import { Component, Input } from '@angular/core';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post?: any
  constructor(private apiService: ApiService) {}

  user_name!: string;
  avatar!: any;
  topic!: string;
  subject!: string;

  ngOnInit() {
    this.apiService.getSpecificUser(this.post.User).subscribe(data => {
      this.user_name = data.User[1]
      this.avatar = data.User[2]
      this.topic = this.post.Topic__name
      this.subject = this.post.Subject
    })
  }
}
