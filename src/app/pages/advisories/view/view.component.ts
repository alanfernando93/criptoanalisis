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
  id;
  like: number;
  dislike: number;
  re: any;
  contentuser: any;
  infouser: any;
  contentAnswer: any;
  position: string;

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
    this.getusername()

  }

  getAdvisoryByIduser() {
    this.route.params.forEach((params: Params) => {
      this.id = params['advisoryId'];

      this.advisoriesService.getAdvisoriesId(this.id).subscribe((advisories) => {
        this.advisory = advisories;
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




