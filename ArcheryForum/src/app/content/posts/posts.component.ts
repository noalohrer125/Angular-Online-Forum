import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { RouterLink } from '@angular/router';
import { NewPostComponent } from "./new-post/new-post.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    PostComponent,
    RouterLink,
    NewPostComponent
],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

}
