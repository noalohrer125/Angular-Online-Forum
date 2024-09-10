import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:8000';
  public csrfToken: string | null = null;

  getCsrfToken(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/get-csrf-token/`, { withCredentials: true });
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

  getPosts(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/get_posts/', { withCredentials: true })
  }

  getAnswers(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/get_answers/')
  }

  getTopics(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/get_topics/')
  }


  getSpecificTopic(topic_id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8000/get_specific_topic/${topic_id}/`);
  }

  getSpecificPost(post_id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8000/get_specific_post/${post_id}/`);
  }

  getSpecificAnswer(answer_id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8000/get_specific_answer/${answer_id}/`);
  }


  addPost(post: any): Observable<any> {
    console.log(this.csrfToken);
    const csrfToken = this.getCsrfTokenFromCookie();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || ''
    });
    return this.httpClient.post(`${this.baseUrl}/add_post/`, post, { headers, withCredentials: true });
  }

  addAnswer(answer: any) {
    return this.httpClient.post('http://localhost:8000/add_answer/', answer);
  }

  addTopic(topic: any) {
    return this.httpClient.post('http://localhost:8000/add_topic/', topic)
  }

  deletePost(post_id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8000/delete_post/${post_id}/`);
  }

  deleteAnswer(answer_id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8000/delete_answer/${answer_id}/`);
  }

  deleteTopic(topic_id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8000/delete_topic/${topic_id}/`);
  }


  editPost(post: any): Observable<any> {
    return this.httpClient.post('http://localhost:8000/edit_post/', post);
  }

  editAnswer(answer: any): Observable<any> {
    return this.httpClient.post('http://localhost:8000/edit_answer/', answer);
  }

  // User-Handling
  login(user: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });

    return this.httpClient.post(`${this.baseUrl}/login/`, user, { headers, withCredentials: true });
  }

  logout() {
    return this.httpClient.get('http://localhost:8000/logout/')
  }

  signUp(user: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''  // Add CSRF token to request header
    });

    return this.httpClient.put(`${this.baseUrl}/sign_up/`, user, { headers, withCredentials: true });
  }

  current_user() {
    return this.httpClient.get('http://localhost:8000/current_user/')
  }

  is_authenticated() {
    return this.httpClient.get('http://localhost:8000/isAuthenticated/', { withCredentials: true })
  }
}
