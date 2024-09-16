import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:8000/';
  public csrfToken: string | null = null;

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

  // TODO: Sort by User-Handling, then CRUD-Operations (first add, then get, then edit, then delete)

  // get-APIs
  getPosts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_posts/`)
  }

  getAnswers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_answers/`)
  }

  getTopics(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get_topics/`)
  }

  // specific get-APIs
  getSpecificTopic(topic_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_topic/${topic_id}/`);
  }

  getSpecificPost(post_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_post/${post_id}/`);
  }

  getSpecificAnswer(answer_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}get_specific_answer/${answer_id}/`);
  }

  // add-APIs
  // TODO: Replace any with Interface datatypes
  addPost(post: any): Observable<any> {
    const csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_post/`, post, { headers, withCredentials: true });
  }

  addAnswer(answer: any) {
    const csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_answer/`, answer, { headers, withCredentials: true });
  }

  addTopic(topic: any) {
    const csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}add_topic/`, topic, { headers, withCredentials: true })
  }

  // delete-APIs
  deletePost(post_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}delete_post/${post_id}/`);
  }

  deleteAnswer(answer_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}delete_answer/${answer_id}/`);
  }

  deleteTopic(topic_id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}delete_topic/${topic_id}/`);
  }

  // edit-APIs
  editPost(post: any): Observable<any> {
    const csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}edit_post/`, post, { headers, withCredentials: true });
  }

  editAnswer(answer: any): Observable<any> {
    const csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}edit_answer/`, answer, { headers, withCredentials: true });
  }

  // User-Handling
  login(user: object): Observable<any> {
    this.csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });
    return this.httpClient.post(`${this.baseUrl}login/`, user, { headers, withCredentials: true });
  }

  logout() {
    return this.httpClient.get(`${this.baseUrl}logout/`, { withCredentials: true })
  }

  signUp(user: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });

    return this.httpClient.put(`${this.baseUrl}sign_up/`, user, { headers, withCredentials: true });
  }

  // user-infomration
  current_user() {
    return this.httpClient.get(`${this.baseUrl}current_user/`, { withCredentials: true })
  }

  is_authenticated() {
    return this.httpClient.get(`${this.baseUrl}isAuthenticated/`, { withCredentials: true })
  }
}
