import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { User } from "./auth/user";

@Injectable({providedIn: 'root'})

export class AuthService {
  constructor(private http: HttpClient) {}
  private token: string
  getToken(): string {
    return this.token
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
    })
  }
}
