import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/observable/of';

let counter = 0;

@Injectable()
export class UserService {

  private baseUrl = environment.apiUrl;

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' }    
  };

  private userArray: any[];

  constructor(private http: Http) {
    // this.userArray = Object.values(this.users);
    // this.http.get(this.baseUrl + 'usuarios/1').toPromise();
  }

  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getUser(idUser: Number, token: String): any {
    return this.http.get(this.baseUrl + 'usuarios/' + idUser + '?access_token=' + token).toPromise();
    // counter = (counter + 1) % this.userArray.length;
    // return Observable.of(this.userArray[counter]);
  }
}
