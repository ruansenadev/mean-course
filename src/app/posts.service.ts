import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from './post';

@Injectable({providedIn: 'root'})
export class PostsService {
  // cache posts
  private posts: Post[] = [];
  // serve updates
  private postsUpdated = new Subject<Post[]>();
  getPosts(): Post[] {
    return [...this.posts]
  }
  postUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string): void {
    const post: Post = {title, content}
    this.posts.push(post)
    this.postsUpdated.next([...this.posts]);
  }
}
