import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { Topic } from '../../../interfaces';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  topics!: Topic[];

  ngOnInit() {
    this.apiService.getTopics().subscribe(response => {
      this.topics = response;
    });
  }

  cancel() {
    window.location.href = '/posts'
  }

  subject!: string;
  content!: string;
  topic!: string;

  onSubmit() {
    const post = {
      id: 0,
      Subject: this.subject,
      Content: this.content,
      Topic_name: this.topic,
    };

    this.apiService.addPost(post).subscribe(response =>
      {
        this.router.navigate(['/posts']);
      });
  }
}
