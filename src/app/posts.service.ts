import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../environments/environment";
import { Post } from './post';
const url = environment.server + '/api/posts'

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient, private router: Router) { }

  private posts: Post[] = [];
  private stream = new Subject<{posts: Post[], postsCount: number}>();
  getPosts(items: number, left: number): void {
    const query = `?items=${items}&left=${left}`
    this.http.get<{message: string, posts: Post[], postsCount: number}>(url+query).subscribe((res) => {
      this.posts = res.posts
      this.stream.next({posts: [...this.posts], postsCount: res.postsCount})
    })
  }
  postsListener() {
    return this.stream.asObservable();
  }
  getPost(id) {
    return this.http.get<Post>(`${url}/${id}`)
  }
  addPost(title: string, content: string, image: File): void {
    const data = new FormData()
    data.append('title', title)
    data.append('content', content)
    data.append('image', image, title)
    this.http.post<{message: string, post: Post, postsCount: number}>(url, data).subscribe((res) => {
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
    this.http.patch<{message: string}>(`${url}/${id}`, data).subscribe((res) => {
      this.router.navigate(['/'])
    })
  }
  delPost(id: string) {
    return this.http.delete<{message: string}>(`${url}/${id}`)
  }
}
