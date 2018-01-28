import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    protected token;
    protected userId;

    constructor() { 
        this.token = localStorage.getItem('auth_app_token');
        this.userId = localStorage.getItem('userId');
    }
}