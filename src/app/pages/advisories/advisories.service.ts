import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
 export class AdvisoriesService {
    private baseUrl = environment.apiUrl;
    //private token = environment.usertoken;
    private userId = environment.userId;
    
    
    
    
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
    getAdvisoriesPago(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id +'/pagos')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesDisputa(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id +'/disputa')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesComentarios(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id +'/comments')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesComentarioscont(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id +'/comments'+'/count')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesComentariosRespuestas(id){
        return this.http.get('http://localhost:3000/api/' + 'comentario_asesoria/' + id +'/answers')
        .map((res: Response) => res.json())
        
    }
    //http://192.168.0.17:3000/api/    

    postDislikes(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id + '/dislike?userId=' + this.userId)
            .map((res:Response) => res.json());
      }
    
      postLikes(id){
        return this.http.get('http://localhost:3000/api/' + 'asesoria_personals/' + id + '/like?userId=' + this.userId)
            .map((res:Response) => res.json());
      }

      postadvisorieComment(id, comments) {
        return this.http.post(this.baseUrl + 'asesoria_personals/' + id + '/comments', comments)
          .map((res: Response) => res.json());
    }
      
    
    
 }