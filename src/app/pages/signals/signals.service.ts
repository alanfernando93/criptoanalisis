import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class SignalsService {
    private baseUrl = environment.apiUrl;
    private token = environment.usertoken;
    private userId = environment.userId;

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

    postLikes(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/like?userId=' + this.userId + '&access_token=' + this.token)
            .map((res: Response) => res.json());
    }

    postDislikes(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/dislike?userId=' + this.userId + '&access_token=' + this.token)
            .map((res: Response) => res.json());
    }

}