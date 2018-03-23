import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class CoinsService{
    
    private baseUrl = environment.apiUrl;
    private token = environment.usertoken;
    private userId = environment.userId;
    private table = "monedas";

    constructor(private http:Http){
        console.log(this.token);
    }

    getCoins(){
        return this.http.get(this.baseUrl + 'monedas/nombres')
        .map((res: Response) => res.json());
    }

    getById(id) {
        return this.http.get(this.baseUrl + this.table + "/" + id + this.getAuth())
        .map((res:Response)=> res.json());
    }

    getAll() {
        return this.http
        .get(this.baseUrl + this.table + this.getAuth())
        .map((res:Response)=> res.json());
    }

    getAuth(){
        return "?access_token=" + this.token;
    }
}