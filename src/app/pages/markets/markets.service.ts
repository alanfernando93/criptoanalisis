import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class MarketsService {

    private baseUrl = environment.apiUrl;

    constructor(private http: Http){
        
    }

    getMarkets(){
        return this.http.get(this.baseUrl + 'mercados')
        .map((res: Response) => res.json())
    }
}