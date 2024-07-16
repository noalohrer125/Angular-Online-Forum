import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from "./navigationbar/navigationbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArcheryForum';
}
