import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Topic } from '../../../interfaces';
import { imageService } from '../../../services/image.service';

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
  constructor(private apiService: ApiService, private router: Router, private imageService: imageService) {}

  topics!: Topic[];
  selectedFile!: File | null; // Store the selected file
  svgString: string = '';

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
    file: new FormControl,
  })

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
      this.postForm.patchValue({ file: this.selectedFile }); // Optionally, update form control
    }
  }

  async onSubmit() {
    // Convert file to binary string if a file was selected
    if (this.selectedFile) {
      this.svgString = await this.imageService.imageToSvg(this.selectedFile);
    }

    const post = {
      id: 0,
      Subject: this.postForm.value.subject,
      Content: this.postForm.value.content,
      Topic_name: this.postForm.value.topic,
      image: this.svgString,
    };

    console.log('Post: ', post)

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
