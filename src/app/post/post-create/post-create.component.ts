import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  postTitle = 'ola ganhafoto';
  postContent = 'o quanto ja cresceu?';
  @Output() postAdded = new EventEmitter();
  onAddPost() {
    this.postAdded.emit({
      title: this.postTitle,
      content: this.postContent
    })
  }

}
