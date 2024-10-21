import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Answer, Post, sort_order, Topic, voting } from './interfaces';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:8000/';
  public csrfToken: string | null = this.getCsrfTokenFromCookie();

  // Tokens
  getCsrfToken(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get-csrf-token/`, { withCredentials: true });
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
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });
    return this.httpClient.post(`${this.baseUrl}login/`, user, { headers, withCredentials: true });
  }

  logout() {
    this.csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });
    return this.httpClient.post(`${this.baseUrl}logout/`, '', { headers, withCredentials: true })
  }

  signUp(user: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });
    return this.httpClient.post(`${this.baseUrl}sign_up/`, user, { headers, withCredentials: true });
  }

  // user-infomration
  current_user() {
    return this.httpClient.get(`${this.baseUrl}current_user/`, { withCredentials: true })
  }

  is_authenticated() {
    return this.httpClient.get(`${this.baseUrl}isAuthenticated/`, { withCredentials: true })
  }

  getSpecificUser(User_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_user_object/${User_id}/`, {withCredentials: true});
  }

  // voting-APIs
  votePost(voting: voting, post_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });
    return this.httpClient.post<any>(`${this.baseUrl}vote_post/${voting}/${post_id}`, '', { headers, withCredentials: true });
  }

  voteAnswer(voting: voting, answer_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });
    return this.httpClient.post<any>(`${this.baseUrl}vote_answer/${voting}/${answer_id}`, '', { headers, withCredentials: true });
  }


  // add-APIs
  addPost(post: Post): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_post/`, post, { headers, withCredentials: true });
  }

  addAnswer(answer: Answer) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_answer/`, answer, { headers, withCredentials: true });
  }

  addTopic(topic: Topic) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_topic/`, topic, { headers, withCredentials: true })
  }


  // get-APIs
  getPosts(sort_order: sort_order): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_posts/${sort_order}/`, { withCredentials: true });
  }

  getLikedPosts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_liked_posts/`, { withCredentials: true })
  }

  getAnswers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_answers/`, { withCredentials: true })
  }

  getTopics(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_topics/`, { withCredentials: true })
  }

  getAvatars(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_avatars/`, { withCredentials: true })
  }

  // specific get-APIs
  getSpecificTopic(topic_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_topic/${topic_id}/`, { withCredentials: true });
  }

  getSpecificPost(post_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_post/${post_id}/`, { withCredentials: true });
  }

  getSpecificAnswer(answer_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_answer/${answer_id}/`, { withCredentials: true });
  }


  // edit-APIs
  editPost(post: Post): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.put(`${this.baseUrl}edit_post/`, post, { headers, withCredentials: true });
  }

  editAnswer(answer: Answer): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.put(`${this.baseUrl}edit_answer/`, answer, { headers, withCredentials: true });
  }


  // delete-APIs
  deletePost(post_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.delete<any>(`${this.baseUrl}delete_post/${post_id}/`, { headers, withCredentials: true});
  }

  deleteAnswer(answer_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.delete<any>(`${this.baseUrl}delete_answer/${answer_id}/`, { headers, withCredentials: true});
  }

  deleteTopic(topic_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.httpClient.delete<any>(`${this.baseUrl}delete_topic/${topic_id}/`, { headers, withCredentials: true});
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

  // Constructor to listen for URL changes
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filter for NavigationEnd events
    ).subscribe((event: NavigationEnd) => {
      this.onURLChange(); // Call onURLChange when URL change detected
    });
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
  return this.httpClient.post(`${this.baseUrl}report_post/`, data, { headers, withCredentials: true });
  }
}
