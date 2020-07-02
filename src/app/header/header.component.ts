import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  isAuth = false
  private authListener: Subscription;

  ngOnInit() {
    this.authListener = this.authService.getAuthStatusListener().subscribe((status) => {
      this.isAuth = status
    })
  }
  ngOnDestroy() {
    this.authListener.unsubscribe()
  }
}
