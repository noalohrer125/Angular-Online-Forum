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

  getSpecificTopic(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8000/get_specific_topic/}${id}/`);
  }

  addPost(post: any) {
    return this.httpClient.post('http://localhost:8000/add_post/', post);
  }

  addAnswer() {

  }

  addTopic() {

  }

  addUser() {

  }
}
