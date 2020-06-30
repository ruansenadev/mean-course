import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../../post";
import { PostsService } from "../../posts.service";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService) {}
  posts: Post[] = []
  isLoading: boolean;
  totalPosts: number;
  itemsPage = 2;
  left = 0;
  itemsPerPage = [2, 4, 6, 10];
  private postsListen: Subscription;
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.itemsPage, this.left)
    this.postsListen = this.postsService.postsListener().subscribe((res) => {
      this.isLoading = false;
      this.totalPosts = res.postsCount
      this.posts = res.posts
    })
  }
  ngOnDestroy() {
    this.postsListen.unsubscribe()
  }
  onDelete(id): void {
    this.postsService.delPost(id).subscribe((res) => {
      console.log(res.msg)
      this.postsService.getPosts(this.itemsPage, this.left)
    })
  }
  onPaginate(event: PageEvent): void {
    this.isLoading = true;
    this.itemsPage = event.pageSize;
    this.left = event.pageIndex
    this.postsService.getPosts(this.itemsPage, this.left)
  }
}
