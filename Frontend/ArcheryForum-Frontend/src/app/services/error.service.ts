// error.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessageSource = new BehaviorSubject<string>('');
  currentErrorMessage = this.errorMessageSource.asObservable();

  constructor() {}

  getUserFriendlyErrorMessage(error: any): string {
    const errorCode = error.status
    switch (errorCode) {
        case 200:
            return "The action was successful!";
        case 201:
            return "Successfully created!";
        case 202:
            return "The request was accepted and is being processed.";
        case 204:
            return "Request successful, but there is no data to display.";
        case 301:
            return "This page has been permanently moved. Please update your bookmarks.";
        case 302:
            return "The requested page has been temporarily moved.";
        case 304:
            return "No changes to the data.";
        case 307:
            return "The page has been temporarily relocated; please try again later.";
        case 308:
            return "This page has permanently moved; please adjust your bookmarks.";
        case 400:
            return "The request was incorrect. Please check your inputs.";
        case 401:
            return "Please log in to continue.";
        case 403:
            return "Access denied. You don't have permission to perform this action.";
        case 404:
            return "Page not found. Something went wrong with an URL. Please refresh the page.";
        case 405:
            return "This action is not allowed. Please try a different method.";
        case 408:
            return "Request timed out. Please try again.";
        case 409:
            return "There is a conflict with the current data. Please refresh the page and try again.";
        case 410:
            return "This page is no longer available.";
        case 413:
            return "The file is too large. Please upload a smaller file.";
        case 429:
            return "Too many requests. Please wait a moment and try again.";
        case 500:
            return "Something went wrong with our Server. Please refresh the page or try again later.";
        default:
            return "Something went wrong, thanks for your understanding.";
      }
  }


  showError(error: any) {
    const message = this.getUserFriendlyErrorMessage(error)
    this.errorMessageSource.next(message);
  }

  clearError() {
    this.errorMessageSource.next('');
  }
}
