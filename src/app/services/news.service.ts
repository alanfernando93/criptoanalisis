import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SessionService } from "../model/session";

@Injectable()
export class NewsService extends SessionService implements OnInit {

  private baseUrl = environment.apiUrl;
  private table = "noticias";

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit() {}

  getById(id) {
    return this.http.get(this.baseUrl + this.table + "/" + id + this.getToken()).toPromise();
  }

  insertNews(body) {
    return this.http.post(this.baseUrl + this.table + this.getToken(), body).toPromise();
  }

  toString():String{
    return "" + this.getToken() + "";
  }
}
