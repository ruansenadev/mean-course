import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Post } from './post';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) { }
  private posts: Post[] = [];
  private stream = new Subject<Post[]>();
  getPosts(): void {
    this.http.get<Post[]>('http://localhost:3000/api/posts').subscribe(posts => {
      this.posts = posts
      this.stream.next([...this.posts])
    })
  }
  postsListener() {
    return this.stream.asObservable();
  }
  addPost(title: string, content: string): void {
    const post: Post = { _id: null, title, content }
    this.posts.push(post)
    this.stream.next([...this.posts]);
  }
}
