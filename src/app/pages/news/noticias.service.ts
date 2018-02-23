import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class NoticiasService {
  private baseUrl = environment.apiUrl;
  
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
}