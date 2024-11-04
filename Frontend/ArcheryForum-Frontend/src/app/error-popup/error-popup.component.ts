// error-popup.component.ts
import { Component } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-popup',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent {
  errorMessage: string = '';

  constructor(private errorService: ErrorService) {
    this.errorService.currentErrorMessage.subscribe(message => {
      this.errorMessage = message;
    });
  }

  closePopup() {
    this.errorService.clearError(); // Clears the error when the popup is closed
  }
}
