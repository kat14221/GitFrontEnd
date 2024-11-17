import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('access_token', 'fake-jwt-token');
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
