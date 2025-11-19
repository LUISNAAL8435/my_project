import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: any = null;

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this._user = JSON.parse(saved);
    }
  }

  login(user: any) {
    this._user = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this._user = null;
    localStorage.removeItem('currentUser');
  }

  get user() {
    return this._user;
  }

  get userId(): number | null {
    return this._user ? this._user.id : null;
  }

  get isLoggedIn(): boolean {
    return !!this._user;
  }
}
