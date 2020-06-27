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
    this.http.get<{msg: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((res) => {
      this.posts = res.posts
      this.stream.next([...this.posts])
    })
  }
  postsListener() {
    return this.stream.asObservable();
  }
  addPost(title: string, content: string): void {
    const post: Post = { _id: null, title, content }
    this.http.post<{msg: string, post: Post}>('http://localhost:3000/api/posts', post).subscribe((res) => {
      console.log(res.post)
      this.posts.push(res.post)
      this.stream.next([...this.posts])
    })
  }
  delPost(id): void {
    this.http.delete(`http://localhost:3000/api/posts/${id}`).subscribe((res) => {
      this.posts = this.posts.reduce((updated, post) => {
        if(post._id !== id) updated.push(post)
        return updated
      }, [])
      console.log(this.posts)
      this.stream.next([...this.posts])
    })
  }
}
