import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Session } from '../../@core/data/session'
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class MarketsService extends Session{

    private baseUrl = environment.apiUrl;

    constructor(private http: Http){
        super()
    }

    getMarkets(){
        return this.http.get(this.baseUrl + 'mercados' + this.getAuth())
                        .map((res: Response) => res.json())
    }

    getMarketId(id){
        return this.http.get(this.baseUrl + 'mercados/' + id + this.getAuth())
                        .map((res: Response) => res.json());
    }

    getAuth() {
        return "?access_token=" + this.getToken();
    }
}