import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _GLOBAL } from '../../common/ConfigSettings';

export class CryptoHttp {

    private baseUrl = _GLOBAL.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    get(url: string) {
        return this.http.get(url).toPromise();
    }

    post(url) { }

}
