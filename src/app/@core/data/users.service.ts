import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

import { environment } from "../../../environments/environment";

import { SessionService } from "../../model/session";

import "rxjs/add/observable/of";

let counter = 0;

@Injectable()
export class UserService extends SessionService  {
  private baseUrl = environment.apiUrl;
  private table = "usuarios";
  private session:any=null;

  private users = {
    nick: { name: "Nick Jones", picture: "assets/images/nick.png" }
  };

  private userArray: any[];

  constructor(
    private http: Http,
  ) {
    super();    
  }

  setSession(item){
    this.session = item;
  }

  getSession(){
    return this.session;
  }

  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getUser(){
    return this.http
    .get(this.baseUrl + this.table + "/" + this.getUserId() + this.getToken())
    .toPromise();
  }

  update(itemToUpdate) {
    return this.http
      .put(
        this.baseUrl + this.table + "/" + this.getUserId() + this.getToken(),
        itemToUpdate
      )
      .toPromise();
  }

  makeFileRequest(file: any) {
    return this.http
      .post(
        this.baseUrl + this.table + "/" + this.getUserId() + "/upload" + this.getToken(),
        file
      )
      .toPromise();
  }

  logout() {
    return this.http
      .post(this.baseUrl + this.table + "/logout" + this.getToken(), {})
      .toPromise();
  }
}
