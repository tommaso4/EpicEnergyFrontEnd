import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenSvcService {

  tokek: string | null = null;


  constructor() { }

  setToken(token: string): void {
    this.tokek = token;
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    this.tokek = localStorage.getItem('token');
    return this.tokek;
  }

  removeToken():void {
    localStorage.removeItem('token')
  }
}
