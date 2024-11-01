import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, throwError } from 'rxjs';
import { Answer, Post, sort_order, Topic, voting } from '../interfaces';
import { NavigationEnd, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private router: Router, private errorService: ErrorService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filter for NavigationEnd events
    ).subscribe((event: NavigationEnd) => {
      this.onURLChange(); // Call onURLChange when URL change detected
    });
  }

  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/';
  public csrfToken: string | null = this.getCsrfTokenFromCookie();

  // Helper method to handle errors
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.errorService.showError(error); // Show the error popup
    return throwError(() => new Error(errorMessage)); // Rethrow the error as an observable
  }


  // Tokens
  getCsrfToken(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get-csrf-token/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getCsrfTokenFromCookie(): string | null {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  setCsrfToken(token: string) {
    this.csrfToken = token;
  }


  // User-Handling
  login(user: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}login/`, user, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  logout(): Observable<any> {
    this.csrfToken = this.getCsrfTokenFromCookie();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}logout/`, '', { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  signUp(user: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}sign_up/`, user, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  // user-information
  current_user(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}current_user/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  is_authenticated(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}isAuthenticated/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getSpecificUser(User_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_user_object/${User_id}/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  // voting-APIs
  votePost(voting: voting, post_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post<any>(`${this.baseUrl}vote_post/${voting}/${post_id}`, '', { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  voteAnswer(voting: voting, answer_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post<any>(`${this.baseUrl}vote_answer/${voting}/${answer_id}`, '', { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }


  // add-APIs
  addPost(post: Post): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_post/`, post, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  addAnswer(answer: Answer): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_answer/`, answer, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  addTopic(topic: Topic): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_topic/`, topic, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }


  // get-APIs
  getPosts(sort_order: sort_order): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_posts/${sort_order}/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getLikedPosts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_liked_posts/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getAnswers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_answers/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getTopics(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_topics/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getAvatars(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_avatars/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  // specific get-APIs
  getSpecificTopic(topic_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_topic/${topic_id}/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getSpecificPost(post_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_post/${post_id}/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  getSpecificAnswer(answer_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_answer/${answer_id}/`, { withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }


  // edit-APIs
  editPost(post: Post): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.put(`${this.baseUrl}edit_post/`, post, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  editAnswer(answer: Answer): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.put(`${this.baseUrl}edit_answer/`, answer, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }


  // delete-APIs
  deletePost(post_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.delete<any>(`${this.baseUrl}delete_post/${post_id}/`, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  deleteAnswer(answer_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.delete<any>(`${this.baseUrl}delete_answer/${answer_id}/`, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }

  deleteTopic(topic_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.delete<any>(`${this.baseUrl}delete_topic/${topic_id}/`, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }


  // Check if backend is running
  checkBackend(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}health-check/`, { withCredentials: true });
  }

  // Initialize a BehaviorSubject to track backend-running state, defaul = true
  private runningBackend = new BehaviorSubject<boolean>(true);

  // Method to update runningBackend state
  setRunningBackend(value: boolean): void {
    this.runningBackend.next(value);
  }

  // Method to get current runningBackend state
  getRunningBackend(): Observable<boolean> {
    return this.runningBackend.asObservable();
  }


  // Method to check backend-status when URL change detected
  private onURLChange() {
    this.checkBackend().subscribe(
      response => {
        this.setRunningBackend(true); // runningBackend = true if the backend-check is successful
      },
      error => {
        this.setRunningBackend(false); // runningBackend = false if there is an error
      }
    );
  }


  // user-report-api
  repostPost(data: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}report_post/`, data, { headers, withCredentials: true })
      .pipe(catchError((error) => {
        return this.handleError(error); // shows the error
      }));
  }
}
