import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { _GLOBAL } from '../../common/ConfigSettings';
import { Session } from '../data/session';

interface Params {
    body: Object;
    filter?: Filter;
    token?: Boolean;
}

interface Filter {
    where?: any;
    fields?: any;
}

export class CryptoHttp extends Session {

    private baseUrl = _GLOBAL.apiUrl;

    constructor(
        private http: HttpClient,
    ) { super(); }

    model(model: string) {
        return {
            get: (query) => {
                return this.request(model, 'get', query);
            },

            post: (body: any) => {
                return this.request(model, 'post', body);
            },

            put: (body: any) => {
                return this.request(model, 'put', body);
            },

            delete: () => {
                return this.request(model, 'delete');
            },
        }
    }

    private request = (url, method, params?: Params) => {
        return this.http[method](`${this.baseUrl}${url}`, params).toPromise().catch(this.handleError);
    }

    private handleError = (err: HttpErrorResponse) => {

    }

    private filter = (types: any) => {

    }

}
