import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

import { Session } from '../../../@core/data/session';
@Injectable()
export class HeaderService extends Session {
    private baseUrl = this.getApiRest();
    constructor(private socket: Socket, private http: Http) {
        super();
    }
    getNotifications() {
        return this.http.get(this.baseUrl + 'notifications?[filter][limit]=7&[filter][where][usuarioId]=' + this.getUserId())
            .map((res: Response) => res.json());
    }
    getUser(id: number) {
        return this.http.get(this.baseUrl + 'usuarios/' + id + '?[filter][fields][username]=true&[filter][fields][id]=true&[filter][fields][perfil]=true')
            .map((res: Response) => res.json());
    }
    getSusc() {
        return this.http.get(this.baseUrl + 'followUsers?[filter][where][followerId]=' + this.getUserId())
            .map((res: Response) => res.json());
    }
    connect(id: string) {
        this.socket.emit('join', id)
    }
    findNews(id: string) {
        return this.http.get(this.baseUrl + 'noticias/' + id + '?[filter][fields][titulo]=true&[filter][fields][id]=true&[filter][fields][tipo_moneda]=true')
            .map((res: Response) => res.json());
    }
    findsignal(id: string) {
        return this.http.get(this.baseUrl + 'signals/' + id + '/signalnot?access_token=' + this.getToken())
            .map((res: Response) => res.json());
    }
    changeNotif(id: number) {
        return this.http.post(this.baseUrl + 'notifications/' + id + '/changeStatus', {})
            .map((res: Response) => res.json());
    }
    findnotif(req: string, send: number) {
        const filter = '?[filter][where][and][0][tipo]=' + req +
            '&[filter][where][and][1][senderId]=' + send + '&[filter][where][and][2][usuarioId]=' + this.getUserId() +
            '&[filter][fields][id]=true';
        return this.http.get(this.baseUrl + 'notifications' + filter)
            .map((res: Response) => res.json());
    }
}
