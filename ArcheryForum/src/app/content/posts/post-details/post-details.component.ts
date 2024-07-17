import { Component } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [AnswersComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {

}
