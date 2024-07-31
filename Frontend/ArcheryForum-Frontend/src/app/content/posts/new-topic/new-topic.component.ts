import { Component } from '@angular/core';
import { Topic } from '../../../shared/interfaces';
import { FormControlDirective, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  name!: string;
  description!: string;

  onSubmit() {
    const topic: Topic = {
      id: 1,
      name: this.name,
      description: this.description,
    };

    let Topics = JSON.parse(localStorage.getItem('Topics') || '[]');

    Topics.push(topic);

    localStorage.setItem('Topics', JSON.stringify(Topics));

    window.location.href = '/posts';
  }
}
