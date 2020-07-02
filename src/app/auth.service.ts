import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { User } from "./auth/user";
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthService {
  constructor(private http: HttpClient) {}
  private token: string
  private isAuth = false
  private authListener = new Subject<boolean>()
  getToken(): string {
    return this.token
  }
  getAuthStatus(): boolean {
    return this.isAuth
  }
  getAuthStatusListener() {
    return this.authListener.asObservable()
  }
  createUser(email: string, password: string): void {
    const data: User = {email, password}
    this.http.post<{msg: string, user: User}>('http://localhost:3000/users/signup', data).subscribe((res) => {
      console.log(res)
    })
  }
  login(email: string, password: string): void {
    const data: User = {email, password}
    this.http.post<{token: string}>('http://localhost:3000/users/login', data).subscribe((res) => {
      this.token = res.token;
      if(res.token) {
        this.isAuth = true;
        this.authListener.next(true)
      }
    })
  }
}
