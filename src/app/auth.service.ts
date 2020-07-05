import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from "../environments/environment";
import { User } from "./auth/user";
const url = environment.server + '/users'

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  private token: string
  private id: string
  private tokenTimer: number
  private isAuth = false
  private authListener = new Subject<boolean>()
  getToken(): string {
    return this.token
  }
  getUserId(): string {
    return this.id
  }
  getAuthStatus(): boolean {
    return this.isAuth
  }
  getAuthStatusListener() {
    return this.authListener.asObservable()
  }
  createUser(email: string, password: string): void {
    const data: User = { email, password }
    this.http.post<{ message: string, user: User }>(url+'/signup', data).subscribe((res) => {
      this.router.navigate(['/'])
    }, (err) => {
      this.authListener.next(false)
    })
  }
  storeData(token: string, expiration: Date, id: string): void {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expiration.toISOString())
    localStorage.setItem('id', id)
  }
  clearStore(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('id')
  }
  login(email: string, password: string): void {
    const data: User = { email, password }
    this.http.post<{ token: string, expiresIn: number , _id: string}>(url+'/login', data).subscribe((res) => {
      this.token = res.token
      if (res.token) {
        this.id = res._id
        this.isAuth = true;
        this.authListener.next(true)
        this.storeData(res.token, new Date(Date.now() + res.expiresIn), res._id)
        this.tokenTimer = setTimeout(() => {
          this.logout()
        }, res.expiresIn)
        this.router.navigate(['/'])
      }
    }, (err) => {
      this.authListener.next(false)
    })
  }
  logout(): void {
    this.token = null
    this.id = null
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
    this.id = localStorage.getItem('id')
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
