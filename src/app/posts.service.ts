import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Post } from './post';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient, private router: Router) { }

  private posts: Post[] = [];
  private stream = new Subject<{posts: Post[], postsCount: number}>();
  getPosts(items: number, left: number): void {
    const query = `?items=${items}&left=${left}`
    this.http.get<{msg: string, posts: Post[], postsCount: number}>('http://localhost:3000/api/posts'+query).subscribe((res) => {
      this.posts = res.posts
      this.stream.next({posts: [...this.posts], postsCount: res.postsCount})
    })
  }
  postsListener() {
    return this.stream.asObservable();
  }
  getPost(id) {
    return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`)
  }
  addPost(title: string, content: string, image: File): void {
    const data = new FormData()
    data.append('title', title)
    data.append('content', content)
    data.append('image', image, title)
    this.http.post<{msg: string, post: Post, postsCount: number}>('http://localhost:3000/api/posts', data).subscribe((res) => {
      this.posts.push(res.post)
      this.stream.next({posts: [...this.posts], postsCount: res.postsCount})
      this.router.navigate(['/'])
    })
  }
  editPost(id: string, title: string, content: string, image: File | string): void {
    let data: FormData | Post;
    if(typeof image === 'object') {
      data = new FormData()
      data.append('_id', id)
      data.append('title', title)
      data.append('content', content)
      data.append('image', image, title)
    } else {
      data = {_id: id, title, content, imagePath: image, author: null};
    }
    this.http.patch<{msg: string}>(`http://localhost:3000/api/posts/${id}`, data).subscribe((res) => {
      console.log(res.msg)
      this.router.navigate(['/'])
    })
  }
  delPost(id: string) {
    return this.http.delete<{msg: string}>(`http://localhost:3000/api/posts/${id}`)
  }
}
