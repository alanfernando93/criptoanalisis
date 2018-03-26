import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class SignalsService {
    private baseUrl = environment.apiUrl;
    private userId = environment.userId;
    private token = environment.usertoken;

    constructor(private http: Http) {

    }

    getAll() {
        return this.http.get(this.baseUrl + 'signals' + '?access_token=' + this.token)
            .map((res: Response) => res.json())
    }

    getById(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '?access_token=' + this.token)
            .map((res: Response) => res.json())
    }

    getSignalsCommentCount(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/comments' + '/count' + '?access_token=' + this.token)
            .map((res: Response) => res.json());
    }

    getUserBySignal(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/usuario' + '?access_token=' + this.token)
            .map((res: Response) => res.json());
    }
    add(signal) {
        signal.usuarioId = this.userId;
        return this.http.post(this.baseUrl + 'signals?access_token=' + this.token, signal)
            .map(resp => resp.json())
    }
    getPositionById(id) {
        return this.http.get(this.baseUrl + 'positions/' + id + '?access_token=' + this.token)
            .map(resp => resp.json())
    }

    setPosition(body) {
        return this.http.post(this.baseUrl + 'positions?access_token=' + this.token, body)
            .map(resp => resp.json())
    }
}