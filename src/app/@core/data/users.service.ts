import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";

import { environment } from "../../../environments/environment";

import { SessionService } from "../../model/session";

import "rxjs/add/observable/of";

let counter = 0;

@Injectable()
export class UserService extends SessionService {
  private baseUrl = environment.apiUrl;
  private table = "usuarios";

  private users = {
    nick: { name: "Nick Jones", picture: "assets/images/nick.png" }
  };

  private userArray: any[];

  constructor(
    private http: Http,
    private authService: NbAuthService
  ) {
    super();
    // this.userArray = Object.values(this.users);
    // this.http.get(this.baseUrl + 'usuarios/1').toPromise();
  }

  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getSignIn() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.getValue()) {
        this.getUser().then(usuario => {
          return JSON.parse(usuario["_body"]);
        });
      }else{
        return null;
      }
    });
  }

  getUser(){
    console.log("getUser-->"+this.token);
    return this.http
    .get(this.baseUrl + this.table + "/" + this.userId + this.token)
    .toPromise();
  }

  update(itemToUpdate) {
    return this.http
      .put(
        this.baseUrl + this.table + "/" + this.userId + this.token,
        itemToUpdate
      )
      .toPromise();
  }

  makeFileRequest(file: any) {
    return this.http
      .post(
        this.baseUrl + this.table + "/" + this.userId + "/upload" + this.token,
        file
      )
      .toPromise();
  }

  logout() {
    super.logout();
    return this.http
      .post(this.baseUrl + this.table + "/logout" + this.token, {})
      .toPromise();
  }
}
