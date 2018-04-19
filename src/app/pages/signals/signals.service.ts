import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Session } from '../../@core/data/session';

import 'rxjs/add/operator/map';

@Injectable()
export class SignalsService extends Session {
    private baseUrl = environment.apiUrl;

    constructor(private http: Http) {
        super()
    }
    
    getAll() {
        return this.http.get(this.baseUrl + 'signals' + '?access_token=' + this.getToken())
            .map((res: Response) => res.json())
    }

    getAllLimit(count, inc) {
        return this.http.get(this.baseUrl + 'signals' + '?access_token=' + this.getToken() + '&filter[order]=FechaCreate%20DESC&filter[limit]=' + count +'&filter[skip]='+ inc )
            .map((res: Response) => res.json())
    }

    getById(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '?access_token=' + this.getToken())
            .map((res: Response) => res.json())
    }

    getSignalsComment(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/comentarioSenals' + '?access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }

    getSignalsAnswer(commentId) {
        return this.http.get(this.baseUrl + 'comentario_senals/' + commentId + '/answer-senals')
            .map((res: Response) => res.json());
    }

    getSignalsCommentCount(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/comentarioSenals/' + 'count?access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }

    getUserBySignal(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/usuario' + '?access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }

    postSignalsComment(comments) {
        comments.userId = this.getUserId();
        return this.http.post(this.baseUrl + '/comentario_senals' + '?access_token=' + this.getToken(), comments)
            .map((res: Response) => res.json());
    }

    postSignalsAnswer(commentId, responds) {
        responds.userId = this.getUserId();
        return this.http.post(this.baseUrl + 'comentario_senals/' + commentId + '/answer-senals' + '?access_token=' + this.getToken(), responds)
            .map((res: Response) => res.json());
    }

    postLikes(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/like?userId=' + this.getUserId() + '&access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }

    postDislikes(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/dislike?userId=' + this.getUserId() + '&access_token=' + this.getToken())
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