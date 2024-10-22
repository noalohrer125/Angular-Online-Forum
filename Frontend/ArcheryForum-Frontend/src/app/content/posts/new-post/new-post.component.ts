import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Topic } from '../../../interfaces';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  topics!: Topic[];

  ngOnInit() {
    this.apiService.getTopics().subscribe(response => {
      if (response.error_message) {
        window.alert('we can not reach our servers, try again later')
      }
      else {
        this.topics = response;
      }
    });
  }

  cancel() {
    window.location.href = '/posts'
  }

  postForm = new FormGroup({
    subject: new FormControl,
    content: new FormControl,
    topic: new FormControl,
  })

  onSubmit() {
    const post = {
      id: 0,
      Subject: this.postForm.value.subject,
      Content: this.postForm.value.content,
      Topic_name: this.postForm.value.topic,
    };

    this.apiService.addPost(post).subscribe(response => {
      if (response.error_message) {
        window.alert('failed to add new Post, try again later')
      }
      else {
        this.router.navigate(['/posts']);
      }
    });
  }
}
