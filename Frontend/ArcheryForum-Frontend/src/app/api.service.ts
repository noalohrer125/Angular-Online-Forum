import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient)

  getPosts(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/get_posts/')
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


  addPost(post: any) {
    return this.httpClient.post('http://localhost:8000/add_post/', post);
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
  login(user: object) {
    return this.httpClient.post('http://localhost:8000/login/', user)
  }

  logout() {
    return this.httpClient.get('http://localhost:8000/logout/')
  }

  sign_up(user: object) {
    return this.httpClient.post('http://localhost:8000/sign_up/', user)
  }

  current_user() {
    return this.httpClient.get('http://127.0.0.1:8000/current_user/')
  }
}
