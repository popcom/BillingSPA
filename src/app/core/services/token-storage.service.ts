import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EXPIRE_KEY = 'auth-expire';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: string): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, user);
  }

  public getUser(): string | null {
    return localStorage.getItem(USER_KEY);
  }

  public saveExpireTime(expireTime: string): void {
    localStorage.removeItem(EXPIRE_KEY);
    localStorage.setItem(EXPIRE_KEY, expireTime);
  }

  public getExpireTime(): string | null {
    return localStorage.getItem(EXPIRE_KEY);
  }
}