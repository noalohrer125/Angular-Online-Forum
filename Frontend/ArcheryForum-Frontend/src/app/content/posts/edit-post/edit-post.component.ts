import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Topic } from '../../../interfaces';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  constructor(private apiService: ApiService) { }

  CurrentPostId = input.required<string>()
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
    const post_id_number = Number(this.CurrentPostId())
    
    this.apiService.getSpecificPost(post_id_number).subscribe(response => {
      if (response.error_message) {
        window.alert('we have issues with our servers, try again later')
      }
      else {
        this.apiService.getSpecificTopic(response.post.Topic).subscribe(data => {
          // fill edit-form with the data of the current-post
          this.postForm.patchValue({
            subject: response.post.Subject,
            content: response.post.Content,
            topic_name: data.name
          })
        });
      }
    });
  }

  postForm = new FormGroup({
    subject: new FormControl,
    content: new FormControl,
    topic_name: new FormControl,
  })

  onSubmit() {
    const post = {
      id: Number(this.CurrentPostId()),
      Subject: this.postForm.value.subject,
      Content: this.postForm.value.content,
      // user_name: 'user',
      Topic_name: this.postForm.value.topic_name,
    };

    this.apiService.editPost(post).subscribe(response => {
      if (response.error_message) {
        window.alert('an error occured, try again later')
      }
      if (response) {
        window.location.href = '/post-details/' + this.CurrentPostId();
      }
      else {
        window.alert('an error occured, try again later')
      }
    });
  }
}
