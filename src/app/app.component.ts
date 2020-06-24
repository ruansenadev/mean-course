import { Component } from '@angular/core';
import { Post } from "./post";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'course-project';
  postsAdded: Post[] = [];
  onPostAdded(post: Post): void {
    this.postsAdded.push(post)
  }
}
