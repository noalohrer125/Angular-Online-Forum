import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Answer, Post, Topic } from './shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private httpClient = inject(HttpClient)

  getPosts() {
    return this.httpClient.get<{ Posts: Post[]}>('http://localhost:8000/get_posts/');
  }

  getAnswers() {
    return this.httpClient.get<{ Answers: Answer[]}>('http://localhost:8000/get_answers/');
  }

  getTopics() {
    return this.httpClient.get<{ Topics: Topic[]}>('http://localhost:8000/get_topics/');
  }

  addPost(post: any) {
    return this.httpClient.post('http://localhost:8000/addPost/', post);
  }

  addAnswer() {

  }

  addTopic() {

  }

  addUser() {

  }
}
