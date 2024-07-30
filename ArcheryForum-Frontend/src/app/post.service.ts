import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private currentPostId: number = 0;

  setCurrentPostId(postId: number): void {
    this.currentPostId = postId;
    console.log(this.currentPostId)
  }

  getCurrentPostId(): number {
    return this.currentPostId;
  }
}
