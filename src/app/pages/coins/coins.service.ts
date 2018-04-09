import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Session } from '../../@core/data/session';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class CoinsService extends Session {

    private baseUrl = environment.apiUrl;
    private table = "monedas";

    constructor(private http: Http) {
        super()
    }

    getCoinsName() {
        return this.http.get(this.baseUrl + this.table + '/nombres' + this.getAuth())
            .map((res: Response) => res.json());
    }

    getById(id) {
        return this.http.get(this.baseUrl + this.table + "/" + id + this.getAuth())
            .map((res: Response) => res.json());
    }

    getAll() {
        return this.http.get(this.baseUrl + this.table + this.getAuth())
            .map((res: Response) => res.json());
    }

    getAuth() {
        return "?access_token=" + this.getToken();
    }

    getTitle(){
        return this.http.get(this.baseUrl + "titulos" + this.getAuth())
            .map(resp => resp.json())
    }
    
    getTextForm(file){
        return this.http.get(this.baseUrl + "containers/forms/download/"+ file )
            .map(resp => resp)
    }
}