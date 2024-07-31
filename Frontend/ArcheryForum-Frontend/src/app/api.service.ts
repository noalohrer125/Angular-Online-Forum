import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from './shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private httpClient = inject(HttpClient)

  getPosts() {
    return this.httpClient.get<{ Posts: Post[]}>('http://localhost:8000/posts/');
  }
}
