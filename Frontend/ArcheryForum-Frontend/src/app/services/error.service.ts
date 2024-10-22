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

  showError(message: string) {
    this.errorMessageSource.next(message);
  }

  clearError() {
    this.errorMessageSource.next('');
  }
}
