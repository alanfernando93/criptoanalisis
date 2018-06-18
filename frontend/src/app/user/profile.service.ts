import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Session } from '../@core/data/session';

@Injectable()
export class ProfileService extends Session {
    private baseUrl = this.getApiRest();
    constructor(
        private http: Http,
    ) {
        super();
    }
    getmyNews(filter) {
        return this.http.get(this.baseUrl + filter)
        .map(res => res.json());
    }
    getmySignal(id) {
        return this.http.get(
            this.baseUrl + 'signals?[filter][where][usuarioId]=' + id + '&[filter][fields][id]=true&[filter][fields][tipo]=true&[filter][fields][FechaCreate]=true&access_token=' + this.getToken(),
        )
        .map(res => res.json());
    }
    getmyTransaccions(id) {
        return this.http.get(
            this.baseUrl + 'transaccions?[filter][where][or][0][senderId]=' + id + '&[filter][where][or][1][recieverId]=' + id,
        )
        .map(res => res.json())
    }
    getsimpleuser(id) {
        return this.http.get(this.baseUrl + 'usuarios/' + id + '?[filter][fields][username]=true')
        .map(res => res.json());
    }
}
