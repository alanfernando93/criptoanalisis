import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { _GLOBAL } from '../../common/ConfigSettings';

export class CryptoHttp {

    private baseUrl = _GLOBAL.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    get(model: string) {
        return this.http.get(`${this.baseUrl}${model}`).toPromise().catch(this.handleError);
    }

    post(model: string, body: any) {
        return this.http.post(`${this.baseUrl}${model}`, body).toPromise().catch(this.handleError);
    }

    put(model: string, body: any) {
        return this.http.put(`${this.baseUrl}${model}`, body).toPromise().catch(this.handleError);
    }

    delete(model: string) {
        return this.http.delete(`${this.baseUrl}${model}`).toPromise().catch(this.handleError);
    }

    private handleError = (err: HttpErrorResponse) => {

    }

}
