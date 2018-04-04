import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import { Session } from '../../@core/data/session';

@Injectable()
export class SignalsService extends Session{
    private baseUrl = environment.apiUrl;

    constructor(private http: Http) {
        super()
    }

    getAlls() {
        return this.http.get(this.baseUrl + 'signals' + '?access_token=' + this.getToken())
            .map(res => res.json())
    }

    getById(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '?access_token=' + this.getToken())
            .map(res => res.json())
    }

    getSignalsCommentCount(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/comments' + '/count' + '?access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }

    getUserBySignal(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/usuario' + '?access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }
    add(signal) {
        signal.usuarioId = this.getUserId();
        return this.http.post(this.baseUrl + 'signals?access_token=' + this.getToken(), signal)
            .map(resp => resp.json())
    }
    getPositionById(id) {
        return this.http.get(this.baseUrl + 'positions/' + id + '?access_token=' + this.getToken())
            .map(resp => resp.json())
    }

    setPosition(body) {
        return this.http.post(this.baseUrl + 'positions?access_token=' + this.getToken(), body)
            .map(resp => resp.json())
    }

    imageFileUpload(idNews, file) {
        return this.http.post(this.baseUrl + 'signals/' + idNews + '/upload?access_token=' + this.getToken(), file)
            .map(resp => resp.json())
    }

}