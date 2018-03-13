import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {
  private baseUrl = environment.apiUrl;
  private token = environment.usertoken;
  private userId = environment.userId;

  constructor(private http: Http) {

  }

  getNews() {
    return this.http.get(this.baseUrl + 'noticias')
      .map((res: Response) => res.json())
  }

  getById(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id)
      .map((res: Response) => res.json());
  }

  insert(body) {
    return this.http.post(this.baseUrl + 'noticias', body).map((res: Response) => res.json());
  }

  postNews(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/comment?userId' + this.userId)
      .map((res: Response) => res.json());
  }

  postDislikes(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/dislike?userId=' + this.userId)
      .map((res: Response) => res.json());
  }

  postLikes(id) {
    return this.http.get(this.baseUrl + 'noticias/' + id + '/like?userId=' + this.userId)
      .map((res: Response) => res.json());
  }

}