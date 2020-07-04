import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from "./mime-type.validator";
import { PostsService } from "../../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../../post";
import { AuthService } from "../../auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  constructor(private postsService: PostsService, private route: ActivatedRoute, private authService: AuthService) {}
  form: FormGroup;
  private use: string = 'create';
  private postId: string;
  isLoading: boolean;
  imagePreview: string;
  post: Post;
  authListen: Subscription;
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
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
            content: this.post.content,
            image: this.post.imagePath || null
          })
          if(this.post.imagePath) this.imagePreview = this.post.imagePath
        })
      }
    })
    this.authListen = this.authService.getAuthStatusListener().subscribe((status) => {
      this.isLoading = false
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
    this.use === "edit" ?
      this.postsService.editPost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image) :
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
    this.form.reset()
  }
}
