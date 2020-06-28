import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../../post";
import { PostsService } from "../../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService) {}
  posts: Post[] = []
  isLoading: boolean;
  private postsListen: Subscription;
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts()
    this.postsListen = this.postsService.postsListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts
    })
  }
  ngOnDestroy() {
    this.postsListen.unsubscribe()
  }

  onDelete(id): void {
    this.postsService.delPost(id)
  }
}
