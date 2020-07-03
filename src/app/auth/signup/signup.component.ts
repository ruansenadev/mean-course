import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from "../../auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  private authListen: Subscription;
  isLoading: boolean;
  ngOnInit() {
    this.authListen = this.authService.getAuthStatusListener().subscribe((status) => {
      this.isLoading = status
    })
  }
  ngOnDestroy() {
    this.authListen.unsubscribe()
  }
  onSignup(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true
    this.authService.createUser(form.value.email, form.value.password)
  }
}
