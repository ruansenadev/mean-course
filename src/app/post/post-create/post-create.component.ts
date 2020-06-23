import { Component } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  postContent = 'ola ganhafoto, o quanto ja cresceu?';
  newPost = '';

  onAddPost() {
    this.newPost = this.postContent
  }
}
