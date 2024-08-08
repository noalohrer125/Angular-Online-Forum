import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Answer, Post, Topic } from './shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient)

  getPosts() {
    return this.httpClient.get<{ Posts: Post[] }>('http://localhost:8000/get_posts/');
  }

  getAnswers() {
    return this.httpClient.get<{ Answers: Answer[] }>('http://localhost:8000/get_answers/');
  }

  getTopics(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/get_topics/')
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
