import { Injectable } from "@angular/core";

@Injectable()
export class SessionService{
  protected token:String;
  protected userId:String;

  constructor() { }

  getToken(){
    return this.token;
  }

  setToken(token){
    this.token = token;
  }

  getUserId(){
    return this.userId;
  }

  setUserId(id){
    this.userId = id;
  }

  clear() {
    
  }

  toString():String{
    return this.getToken + "\n" + this.getUserId;
  }
}
