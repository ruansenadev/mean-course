import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
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
  getPost(id) {
    return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`)
  }
  addPost(title: string, content: string): void {
    const post: Post = { _id: null, title, content }
    this.http.post<{msg: string, post: Post}>('http://localhost:3000/api/posts', post).subscribe((res) => {
      this.posts.push(res.post)
      this.stream.next([...this.posts])
    })
  }
  editPost(id: string, title: string, content: string): void {
    const post = {_id: id, title, content};
    this.http.patch<{msg: string}>(`http://localhost:3000/api/posts/${id}`, post).subscribe((res) => {
      console.log(res.msg)
    })
  }
  delPost(id: string): void {
    this.http.delete(`http://localhost:3000/api/posts/${id}`).subscribe((res) => {
      this.posts = this.posts.reduce((updated, post) => {
        if(post._id !== id) updated.push(post)
        return updated
      }, [])
      this.stream.next([...this.posts])
    })
  }
}
