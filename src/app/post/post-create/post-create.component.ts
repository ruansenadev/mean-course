import { Component } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})

export class PostCreateComponent {
  content = 'no text';


  onAddPost() {
    this.content = 'ola ganhafoto, o quanto ja cresceu?'
  }
}
