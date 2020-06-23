import { Component } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  POSTS = [
    {
      title: "First Article",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, dolore dolor. Cumque consectetur laudantium explicabo minus, eius porro asperiores consequatur non a laboriosam ipsa incidunt assumenda quam excepturi animi necessitatibus!"
    },
    {
      title: "Second Article",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, dolore dolor. Cumque consectetur laudantium explicabo minus, eius porro asperiores consequatur non a laboriosam ipsa incidunt assumenda quam excepturi animi necessitatibus!"
    },
    {
      title: "Third Article",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, dolore dolor. Cumque consectetur laudantium explicabo minus, eius porro asperiores consequatur non a laboriosam ipsa incidunt assumenda quam excepturi animi necessitatibus!"
    },
    {
      title: "Fourth Article",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, dolore dolor. Cumque consectetur laudantium explicabo minus, eius porro asperiores consequatur non a laboriosam ipsa incidunt assumenda quam excepturi animi necessitatibus!"
    },
  ]
}
