import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../model/session';

@Injectable()
export class NewsService extends SessionService implements OnInit {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
    super();
    // console.log(this.token);
    // console.log(this.userId);
  }

  ngOnInit() {
    if(localStorage.length != 0){
      this.token = localStorage.getItem('auth_app_token');
      this.userId = localStorage.getItem('userId');
    }
  }
  getNoticias() {
    return this.http.get(this.baseUrl + 'news').toPromise();
  }

  insertNews(body){
    return this.http.post(this.baseUrl + 'noticias?access_token=' + this.token,body).toPromise();
  }
}