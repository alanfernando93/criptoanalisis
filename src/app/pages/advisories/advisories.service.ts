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
        return this.http.get(this.baseUrl + 'asesoria_personals')
        .map((res: Response) => res.json())
    }

    getAdvisoriesId(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id )
        .map((res: Response) => res.json())
    }

    getAdvisoriesIntruccion(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id +'/instruccions')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesPago(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id +'/pagos')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesDisputa(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id +'/disputa')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesComentarios(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id +'/comments')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesComentarioscont(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id +'/comments'+'/count')
        .map((res: Response) => res.json())
        
    }
    getAdvisoriesComentariosRespuestas(id){
        return this.http.get(this.baseUrl + 'comentario_asesoria/' + id +'/answers')
        .map((res: Response) => res.json())
        
    }

    postDislikes(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id + '/dislike?userId=' + this.userId)
            .map((res:Response) => res.json());
      }
    
      postLikes(id){
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id + '/like?userId=' + this.userId)
            .map((res:Response) => res.json());
      }

     
      getUserByAdvisories(id) {
        return this.http.get(this.baseUrl + 'asesoria_personals/' + id + '/usuario')
          .map((res: Response) => res.json());
      }
      postAdvisoriesComment(id, co) {
        return this.http.post(this.baseUrl + 'asesoria_personals/' + id + '/comments', 

        {
          "contenido": co,
          "userId": this.userId,
          
          
        }
        
        )
          .map((res: Response) => res.json());
      }
      postAdvisoriesAnswer(id, answers) {
        return this.http.post(this.baseUrl + 'comentario_asesoria/' + id + '/answers',answers 
    
        )
          .map((res: Response) => res.json());
      } 

      getUserById(id) {
        return this.http.get(this.baseUrl + 'usuarios/' + id)
          .map((res: Response) => res.json());
    }
    
    
 }