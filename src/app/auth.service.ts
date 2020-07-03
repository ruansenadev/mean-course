import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { User } from "./auth/user";
import { Subject, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  private token: string
  private tokenTimer: number
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
    const data: User = { email, password }
    this.http.post<{ msg: string, user: User }>('http://localhost:3000/users/signup', data).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/'])
    })
  }
  storeData(token: string, expiration: Date): void {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expiration.toISOString())
  }
  clearStore(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }
  login(email: string, password: string): void {
    const data: User = { email, password }
    this.http.post<{ token: string, expiresIn: number }>('http://localhost:3000/users/login', data).subscribe((res) => {
      this.token = res.token
      if (res.token) {
        this.isAuth = true;
        this.authListener.next(true)
        this.storeData(res.token, new Date(Date.now() + res.expiresIn))
        this.tokenTimer = setTimeout(() => {
          this.logout()
        }, res.expiresIn)
        this.router.navigate(['/'])
      }
    })
  }
  logout(): void {
    this.token = null
    this.isAuth = false
    this.authListener.next(false)
    this.clearStore()
    clearTimeout(this.tokenTimer)
    this.router.navigate(['/'])
  }
  authBack() {
    const token = localStorage.getItem('token')
    const expiration = localStorage.getItem('expiration')
    if (!token || !expiration) {
      return
    }
    const expiresIn = new Date(expiration).getTime() - Date.now()
    if (expiresIn > 0) {
      this.token = token
      this.isAuth = true
      this.authListener.next(true)
      this.tokenTimer = setTimeout(() => {
        this.logout()
      }, expiresIn)
    } else {
      this.clearStore()
    }
  }
}
