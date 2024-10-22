import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-new-topic',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './new-topic.component.html',
  styleUrl: './new-topic.component.css'
})
export class NewTopicComponent {
  constructor(private apiService: ApiService) {}

  topicForm = new FormGroup({
    name: new FormControl,
    description: new FormControl,
  })

  onSubmit() {
    const topic = {
      id: 0,
      name: this.topicForm.value.name,
      description: this.topicForm.value.description,
    };

    this.apiService.addTopic(topic).subscribe((response: any) => {
      if (response.error_message) {
        window.alert('failed to add new topic, try again later')
      }
      else {
        window.location.href = '/posts';
      }
    });
  }
}
