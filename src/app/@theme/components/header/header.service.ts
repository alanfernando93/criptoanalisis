import { Injectable } from '@angular/core';
import {Socket} from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import {environment} from '../../../../environments/environment';
import { Session } from '../../../@core/data/session';
@Injectable()
export class HeaderService extends Session{
    private baseUrl= environment.apiUrl;
    constructor(private socket: Socket, private http: Http){
        super();
    }
    getNotifications(){
        return this.http.get(this.baseUrl+ 'notifications?[filter][where][usuarioId]='+this.getUserId())
        .map((res: Response) => res.json());
    }
    getUser(id: number){
        return this.http.get(this.baseUrl+ 'usuarios/'+id+'?[filter][fileds][username]=true&[filter][fileds][id]=true&[filter][fileds][perfil]=true')
        .map((res: Response) => res.json());
    }
}