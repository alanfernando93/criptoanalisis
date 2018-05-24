import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Session } from '../../@core/data/session';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class CoinsService extends Session {

    private baseUrl = this.getApiRest();
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

    getTitle() {
        return this.http.get(this.baseUrl + "titulos" + this.getAuth())
            .map(resp => resp.json())
    }

    getTextForm(file) {
        return this.http.get(this.baseUrl + "containers/forms/download/" + file)
            .map(resp => resp)
    }

    setCoinContent(coin, id) {
        coin.usuarioId = this.getUserId();
        if (id === "undefined")
            return this.http.post(this.baseUrl + "contenidoMonedas" + this.getAuth(), coin).map(resp => resp.json());
        else
            return this.http.put(`${this.baseUrl}contenidoMonedas/${id}${this.getAuth()}`, coin).map(resp => resp.json());
    }

    getTitleConclusion(id){
        return this.http.get(`${this.baseUrl}titulos/${id}/contenido${this.getAuth()}`).map(resp=>resp.json())
    }
}