import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { AdvisoriesService } from '../advisories.service';
import { elementAt } from 'rxjs/operator/elementAt';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  idUser = environment.userId;
  advisory: any;
  coment :any;
  comment : {};
  comment2: any = {};
  comentar :any;
  cont:any;
  comentid :any;
  answers :any;
  ans :any;
  id;
  like:number;
  dislike:number;
  re:any;
  contentuser:any;
  
  constructor(
    private http: Http,
     private route: ActivatedRoute,
      private advisoriesService: AdvisoriesService      
    ) {

  }

  ngOnInit() {
    this.getAdvisoryByIduser()
    this.getAdvisorycommentById()
    this.getAdvisorycommentcontById()
    this.getAdvisoriesWithUser()

    
  }

  getAdvisoryByIduser() {
    this.route.params.forEach((params: Params) => {
      this.id = params['advisoryId'];

      this.advisoriesService.getAdvisoriesId(this.id).subscribe((advisories) => {
        this.advisory = advisories;
      });
    });
  }

  sendDislike(){
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
    this.advisoriesService.postDislikes(id).subscribe(data => {
      this.dislike = data;
      this.advisory=data;
      });
    });
  }


  sendLike(){
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
    this.advisoriesService.postLikes(id).subscribe(data => {
      this.like = data;
      this.advisory=data;
      });
    });
  }

  getAdvisorycommentById() {
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
      this.advisoriesService.getAdvisoriesComentarios(id).subscribe((advisories) => {
        this.coment = advisories;
           
        
         
        this.coment.forEach((element, index) => {
          let commentId = this.coment[index].id;
          this.advisoriesService.getAdvisoriesComentariosRespuestas(commentId).subscribe(data => {
            this.ans = data;
            this.coment[index].res = [];
            this.coment[index].res = data;
            
          });
        });

      });
    });
  }

  getAdvisorycommentcontById() {
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
      this.advisoriesService.getAdvisoriesComentarioscont(id).subscribe((advisories) => {
        this.cont = advisories;         
      });
    });
  }


  getAdvisoriesWithUser() {
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
      this.advisoriesService.getUserByAdvisories(this.id).subscribe((advisories) => {
        this.contentuser = advisories;         
      });
    });
  }
  sendComent2() {
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
      this.comment2.userId = this.idUser;
     this.comment2.asesoriaPersonalId = this.id;
    
      this.comment2.userId = this.idUser;

      this.advisoriesService.postAdvisoriesComment(this.id, this.comment2.contenido).subscribe(data => {
        //document.getElementById('comments').innerHTML. = "";
        console.log("hoal " + this.comment2.contenido)
      });  
    
    });
  }

 
}



