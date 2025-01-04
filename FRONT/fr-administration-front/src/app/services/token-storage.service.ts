import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
const ID_KEY = 'id';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public clear(): void {
    localStorage.clear();
  }
  public save(token: string, username : string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ID_KEY );
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
    localStorage.setItem(ID_KEY,username);
  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }
  public getId(): string {
    const id = localStorage.getItem(ID_KEY);
    return id === null ? '' : id;
  }
  public isLogged(): boolean {
    return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
  }
}
