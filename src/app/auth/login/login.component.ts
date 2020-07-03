import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from "../../auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  private authListen: Subscription;
  isLoading: boolean;
  ngOnInit() {
    this.authListen = this.authService.getAuthStatusListener().subscribe((status) => {
      this.isLoading = false
    })
  }
  ngOnDestroy() {
    this.authListen.unsubscribe()
  }
  onLogin(form: NgForm) {
    if(form.invalid) {
      return
    }
    this.isLoading = true
    this.authService.login(form.value.email, form.value.password)
  }
}
