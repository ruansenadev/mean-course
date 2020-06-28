import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PostsService } from "../../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../../post";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  constructor(private postsService: PostsService, private route: ActivatedRoute) {}
  private use: string = 'create';
  private postId: string;
  isLoading: boolean;
  post: Post;
  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      if(param.has('id')) {
        this.isLoading = true;
        this.use = 'edit';
        this.postId = param.get('id')
        this.postsService.getPost(this.postId).subscribe(post => {
          this.isLoading = false;
          this.post = post
        })
      }
    })
  }

  onSavePost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.use==="edit") {
      this.postsService.editPost(this.postId, form.value.title, form.value.content)
    } else {
      this.postsService.addPost(form.value.title, form.value.content)
    }
    form.resetForm()
  }
}
