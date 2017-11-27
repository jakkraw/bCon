import { Injectable } from '@angular/core';
import { AuthTokens } from './auth';

@Injectable()
export class LoginService {
  private storageTokenKeyName:string = "Tokens"
  private authTokens:AuthTokens = null;
  constructor() {
    this.restoreTokens()
   }

  setToken(authData:AuthTokens):void{
    this.authTokens = authData;
    sessionStorage.setItem(this.storageTokenKeyName, JSON.stringify(authData));
  }

  restoreTokens():void{
    let tokens = sessionStorage.getItem(this.storageTokenKeyName);
    if (tokens != null) this.authTokens = JSON.parse(tokens)
  }

  authHeader():Object{
    return { "Authorization": this.authTokens.token_type + " " + this.authTokens.access_token };
  }

  loggedIn():boolean{
    if(this.authTokens != null && this.authTokens.access_token != null)
      return true;
    return false;
  }

  logOut() {
    this.authTokens = null;
    sessionStorage.removeItem(this.storageTokenKeyName);
  }
}
