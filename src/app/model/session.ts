import { Injectable } from "@angular/core";

@Injectable()
export class SessionService {
  public token:String;
  public userId:String;

  constructor() {
    if (localStorage.length != 0) {
      this.token = "?access_token="+localStorage.getItem("auth_app_token");
      this.userId = localStorage.getItem("userId");
      console.log("session-->"+this.token);
    }
  }

  logout() {
    localStorage.clear();
    this.token = "";
    this.userId = "";
  }
}
