import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { User } from "./auth/user";

@Injectable({providedIn: 'root'})

export class AuthService {
  constructor(private http: HttpClient) {}
  createUser(email: string, password: string): void {
    const data: User = {email, password}
    this.http.post<{msg: string, user: User}>('http://localhost:3000/users/signup', data).subscribe((res) => {
      console.log(res)
    })
  }
}
