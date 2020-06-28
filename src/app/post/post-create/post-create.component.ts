import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;
  private use: string = 'create';
  private postId: string;
  isLoading: boolean;
  imagePreview: string;
  post: Post;
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      image: new FormControl(null, {validators: [Validators.required]})
    })
    this.route.paramMap.subscribe((param: ParamMap) => {
      if(param.has('id')) {
        this.isLoading = true;
        this.use = 'edit';
        this.postId = param.get('id')
        this.postsService.getPost(this.postId).subscribe(post => {
          this.isLoading = false;
          this.post = post
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          })
        })
      }
    })
  }

  onImagePick(event: Event) {
    const imgFile = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({image: imgFile})
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onloadend = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(imgFile)
  }

  onSavePost() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.use==="edit") {
      this.postsService.editPost(this.postId, this.form.value.title, this.form.value.content)
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.content)
    }
    this.form.reset()
  }
}
