import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import {Socket} from 'ng-socket-io';
import { Session } from "./session"

import { environment } from "../../../environments/environment";

import "rxjs/add/observable/of";

let counter = 0;

@Injectable()
export class UserService extends Session{
  private baseUrl = environment.apiUrl;

  constructor(
    private http: Http,
    private socket: Socket
  ) { super() }

  getById(id) {
    return this.http.get(this.baseUrl + "usuarios/" + id  + '?filter[fields][nombre]=true&filter[fields][apellido]=true&filter[fields][puntos]=true&filter[fields][precision]=true&filter[fields][fama]=true&filter[fields][username]=true&filter[fields][perfil]=true&filter[fields][id]=true')
      .map(resp => resp.json());
  }

  /**
   * Retorna el usuario logeado o en actual session
   * 
   * @returns Objeto : any
   */
  getCurrentUser() {
    return this.http.get(this.baseUrl + "usuarios/" + this.getUserId())
      .map(resp => resp.json())
  }
  
  update(itemToUpdate) {
    return this.http.put(this.baseUrl + "usuarios/" + this.getUserId() + "/updateInfo" + this.getAuth(), itemToUpdate)
      .map(resp => resp.json());
  }

  imageFileUpload(file: any) {
    return this.http.post(this.baseUrl + "usuarios/" + this.getUserId() + "/upload" + this.getAuth(), file)
      .map(resp => resp.json());
  }

  logout() {
    return this.http.post(this.baseUrl + "usuarios/logout" + this.getAuth(), {})
      .map(resp => resp.json());
  }

  getAuth() {
    return "?access_token=" + this.getToken()
  }
  connect(){
    this.socket.emit('join', this.getUserId());
  }
  Request(){
    let observable = new Observable(observer =>{
      this.socket.on('request', (data)=>{
        observer.next(data);
      });
      return ()=>{
        this.socket.disconnect();
      }
    })
    return observable;
  }
  
}
