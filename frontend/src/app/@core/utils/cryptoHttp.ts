import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { _GLOBAL } from '../../common/ConfigSettings';
import { Session } from '../data/session';

interface Params {
    body?: any;
    filter?: Filter;
}

interface Filter {
    where?: any;
    fields?: any;
    token?: Boolean;
}

export class CryptoHttp extends Session {

    private baseUrl = _GLOBAL.apiUrl;

    constructor(
        private http: HttpClient,
    ) { super(); }

    model(model: string) {
        return {
            get: (options: Params) => {
                return this.request(model, 'get', options);
            },

            post: (options: Params) => {
                return this.request(model, 'post', options);
            },

            put: (options: Params) => {
                return this.request(model, 'put', options);
            },

            delete: (options: Params) => {
                return this.request(model, 'delete', options);
            },
        }
    }

    private request = (table, method, params: Params) => {
        const url = `${this.baseUrl}${table}`;
        return this.http[method](url,
            params.body ? params.body : {})
            .toPromise()
            .catch(this.handleError);
    }

    private handleError = (err: HttpErrorResponse) => {

    }

    private filter = (filter: Filter) => {
        const array = [];
        const url = '[filter]';
        Object.entries(filter).forEach(([key1, value2]) => {
            const indice = `[${key1}]`;
            Object.entries(indice).forEach(([key, value]) => {
                array.push(`${url}${filter}[${key}]=${value}`);
            });
        });
    }

}
