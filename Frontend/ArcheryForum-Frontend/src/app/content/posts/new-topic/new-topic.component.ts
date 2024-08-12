import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-new-topic',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './new-topic.component.html',
  styleUrl: './new-topic.component.css'
})
export class NewTopicComponent {
  constructor(private apiService: ApiService) {}

  name!: string;
  description!: string;

  onSubmit() {
    const topic = {
      name: this.name,
      description: this.description,
    };

    this.apiService.addTopic(topic).subscribe();
    window.location.href = '/posts';
  }
}
