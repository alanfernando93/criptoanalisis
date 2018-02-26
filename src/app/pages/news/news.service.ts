import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {
  private baseUrl = environment.apiUrl;
  private token = environment.usertoken;
  private userId = environment.usertoken;
  
  constructor(private http: Http) {

  }

  getNews(){
    return this.http.get(this.baseUrl + 'noticias')
                    .map((res: Response) => res.json())
  }

  getNewsId(id){
    return this.http.get(this.baseUrl + 'noticias/' + id)
                    .map((res: Response) => res.json())
  }
/*
  postNews(id){
    return this.http.get(this.baseUrl + 'noticias/' + id + '/comment?userId' + this.userId )
        .map((res: Response) => res.json())
  }
*/
}