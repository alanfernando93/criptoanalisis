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

  getNoticias() {
    return this.http.get(this.baseUrl + this.table).toPromise();
  }

  insertNews(body) {
    return this.http.post(this.baseUrl + this.table + this.token, body).toPromise();
  }
}
