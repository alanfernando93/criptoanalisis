import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";

import { environment } from "../../../environments/environment";

import 'rxjs/add/operator/map';

@Injectable()
export class PositionsService {
    baseUrl = environment.apiUrl;
    token = environment.usertoken;
    userId = environment.userId;


    constructor(
        private http: Http,

    ) { }

    add(body) {
        return this.http.post(this.baseUrl + "positions" + this.getAuth(),body)
            .map(resp => resp.json());
    }

    getById(id){
        return this.http.get(this.baseUrl + "positions" + this.getAuth())
    }

    getAuth() {
        return "?access_token=" + this.token
    }
}