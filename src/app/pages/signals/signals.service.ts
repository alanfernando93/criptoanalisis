import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Session } from '../../@core/data/session';

import 'rxjs/add/operator/map';

@Injectable()
export class SignalsService extends Session {
    private baseUrl = this.getApiRest();

    constructor(private http: Http,
        private socket: Socket,
        private router: Router) {
        super();
    }

    getAll() {
        return this.http.get(this.baseUrl + 'signals' + '?access_token=' + this.getToken())
            .map((res: Response) => res.json())
    }

    getSignals() {
        let observable = new Observable(observer => {
            this.socket.on('insertSig', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            }
        });
        return observable;
    }

    getSignalsCommen() {
        let observable = new Observable(observer => {
            this.socket.on('signalCom', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            }
        });
        return observable;
    }

    getSignalsAns() {
        let observable = new Observable(observer => {
            this.socket.on('signalAns', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            }
        });
        return observable;
    }

    getAllLimit(count, inc) {
        return this.http.get(this.baseUrl + 'signals' + '?access_token=' + this.getToken() + '&filter[order]=FechaCreate%20DESC&filter[limit]=' + count + '&filter[skip]=' + inc)
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

    getPositionBySignal(id) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/position' + '?access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }

    getSignalsCount() {
        return this.http.get(this.baseUrl + 'signals/' + 'count?access_token=' + this.getToken())
            .map(resp => resp.json());
    }

    postSignalsComment(comments) {
        if (!this.isAuth()) {
            return new Observable<any>(() => { this.router.navigate(["/auth/login"]) });
        }
        comments.userId = this.getUserId();
        return this.http.post(this.baseUrl + '/comentario_senals' + '?access_token=' + this.getToken(), comments)
            .map((res: Response) => res.json());
    }

    postSignalsAnswer(responds) {
        responds.userId = this.getUserId();
        return this.http.post(this.baseUrl + 'answer-senals' + '?access_token=' + this.getToken(), responds)
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
            .map(resp => resp.json());
    }

    setPosition(body) {
        return this.http.post(this.baseUrl + 'positions?access_token=' + this.getToken(), body)
            .map(resp => resp.json());
    }

    imageFileUpload(idNews, file) {
        return this.http.post(this.baseUrl + 'signals/' + idNews + '/upload?access_token=' + this.getToken(), file)
            .map(resp => resp.json());
    }

    JoinComm(id) {
        this.socket.emit("join", 'signals' + id);
    }

}