import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticate: boolean = false;


  get userIsAuthenticated() {
    return this._userIsAuthenticate;
  }

  constructor() { }

  login() {
    this._userIsAuthenticate = true;
  }

  logout() {
    this._userIsAuthenticate = false;
  }
}
