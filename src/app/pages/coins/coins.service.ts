import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class CoinsService{
    
    private baseUrl = environment.apiUrl;

    constructor(private http:Http){
        
    }

    getCoin(){
        return this.http.get(this.baseUrl + '/monedas/nombres').map(res => res.json());
    }

}