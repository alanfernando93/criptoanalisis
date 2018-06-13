import { Component, OnInit,ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { AdvisoriesService } from '../advisories.service';
import { elementAt } from 'rxjs/operator/elementAt';
import { environment } from '../../../../environments/environment';
import {ListComponent} from  '../list/list.component';
import { scheduleComponent } from "../../../@theme/components/schedule/schedule.component";
import { Output,Input, EventEmitter } from '@angular/core';
import { Session } from '../../../@core/data/session';
import { _GLOBAL } from '../../../common/ConfigSettings';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent extends Session implements OnInit {
  @ViewChild('h5') tab;
  idUser = this.getUserId();
  
  advisory: any;
  coment: any;
  comment: {};
  comment2: {};
  answer: {};
  answered: any = {};

  comentar: any;
  cont: any;
  comentid: any;
  answers: any;
  ans: any;
  slots2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  id;
  like: number;
  dislike: number;
  re: any;
  contentuser: any;
  infouser: any;
  contentAnswer: any;
  position: string;
  advisories: any;
  modalidad1:any;
  modalidad2:any;
  advisoriesbyid: any;
 
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private advisoriesService: AdvisoriesService,
        
  ) {
    super()

  }

  ngOnInit() {
    this.getAdvisoryByIduser()
    this.getAdvisorycommentById()
    this.getAdvisorycommentcontById()
    this.getAdvisoriesWithUser()
    this.getusername()
    
  }

  getAdvisoryByIduser() {
    this.route.params.forEach((params: Params) => {
      this.id = params['advisoryId'];

      this.advisoriesService.getAdvisoriesId(this.id).subscribe((advisories) => {
        this.advisory = advisories;
        this.advisory.contentUser = [];
                  this.advisory.contentUser.push(advisories);
                  this.advisory.mod1 = " ";
                  this.advisory.mod2 = " ";
                  this.advisory.mod1 = this.advisory.modalidad[0];
                  this.advisory.mod2 = this.advisory.modalidad[1];
                 
                  for(var i=0;i<=this.advisory.horarios.length;i++)
                  {
                    
                this.slots2[this.advisory.horarios[i].dia][this.advisory.horarios[i].hora]=1;
                    
                  }
                   //this.onGetHorario.slots= this.advisory.horarios;
             console.log(this.advisory.horarios+"estos son los horarios")
             console.log(this.tab);         
      });
    });
  }

  sendDislike() {
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
      this.advisoriesService.postDislikes(id).subscribe(data => {
        this.dislike = data;
        this.advisory = data;
      });
    });
  }


  sendLike() {
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
      this.advisoriesService.postLikes(id).subscribe(data => {
        this.like = data;
        this.advisory = data;
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
            
          this.position=index;
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

      this.advisoriesService.postAdvisoriesComment(this.id, this.comment2).subscribe(data => {
        this.coment.push(data)
        
       
      });

    });
  }

  sendAnswer(event) {
    this.route.params.forEach((params: Params) => {
      let id = params['advisoryId'];
      let commentIds = event.target.parentNode.parentNode.childNodes[3].id;
      let index = event.target.parentNode.parentNode.childNodes[3].name;
      console.log(index)
      this.contentAnswer = event.target.parentNode.parentNode.childNodes[3].value;
    this.answered.userId = this.idUser;
    this.answered.contenido = this.contentAnswer;
      this.advisoriesService.postAdvisoriesAnswer(commentIds, this.answered).subscribe(data => {
     
        this.coment[index].res.push(data);
      });
    });
    console.log(this.coment)
  }
  getusername() {
    this.route.params.forEach((params: Params) => {
      let id = this.idUser;
      this.advisoriesService.getUserById(this.id).subscribe((advisories) => {
        this.infouser = advisories;
      });
    });

  }


}




