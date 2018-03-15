import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

import { environment } from "../../../environments/environment";

import "rxjs/add/observable/of";

let counter = 0;

@Injectable()
export class UserService {
  private baseUrl = environment.apiUrl;
  private userId = environment.userId
  private token = environment.usertoken;

  constructor(
    private http: Http,
  ) { }

  getById(id) {
    return this.http.get(this.baseUrl + "usuarios/" + id + this.getAuth())
      .map(resp => resp.json());
  }

  /**
   * Retorna el usuario logeado o en actual session
   * 
   * @returns Objeto : any
   */
  getSession() {
    return this.http.get(this.baseUrl + "usuarios/" + this.userId + this.getAuth())
      .map(resp => resp.json())
  }

  update(itemToUpdate) {
    return this.http.put(this.baseUrl + "usuarios/" + this.userId + this.getAuth(), itemToUpdate)
      .map(resp => resp.json());
  }

  makeFileRequest(file: any) {
    return this.http.post(this.baseUrl + "usuarios/" + this.userId + "/upload" + this.getAuth(), file)
      .map(resp => resp.json());
  }

  logout() {
    return this.http.post(this.baseUrl + "usuarios/logout" + this.getAuth(), {})
      .map(resp => resp.json());
  }

  getAuth() {
    return "?access_token=" + this.token
  }
}
