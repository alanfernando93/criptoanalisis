import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";

import { environment } from "../../environments/environment";
import { SessionService } from "../model/session";

@Injectable()
export class CoinsService extends SessionService implements OnInit {
  private baseUrl = environment.apiUrl;
  private table = "monedas";

  constructor(private http: Http) {
    super();
  }

  ngOnInit() {}

  getById(id) {
    return this.http
      .get(this.baseUrl + this.table + "/" + id + this.getToken())
      .toPromise();
  }

  getAll() {
    return this.http
      .get(this.baseUrl + this.table + this.getToken())
      .toPromise();
  }
}
