import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
 export class AdvisoriesService {
    private baseUrl = environment.apiUrl;
    //private token = environment.usertoken;
    
    constructor(private http: Http){

    }

    getAdvisories(){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals')
        .map((res: Response) => res.json())
    }

    getAdvisoriesId(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id )
        .map((res: Response) => res.json())
    }

    getAdvisoriesIntruccion(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id +'/instruccions')
        .map((res: Response) => res.json())
        
    }    
    
    
 }