import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SignalsService } from '../signals.service';
import { UserService } from '../../../@core/data/users.service';
import * as nbUser from '@nebular/theme/components/user/user.component'

@Component({
  selector: 'ngx-signalsView',
  templateUrl: './signalsView.component.html',
  styleUrls: ['./signalsView.component.scss']
})
export class signalsViewComponent implements OnInit {

  signal: any;
  idSignal: any;
  signalsAnswer: any;
  contentUser: any;
  count: number;
  like: number;
  dislike: number;
  comment: any = {};
  answer: any = {};
  commentById: any = [];
  connectionCom;
  connectionAns;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private signalsService: SignalsService,
    private userService: UserService, ) {
      route.params.subscribe(val=>{
        this.idSignal = val.signalId;
        this.getSignalById();
        this.getSignalWithUser();
        this.getSignalCommentById();
        this.getCommentWithUser();
        this.getSignalCommentCount();
      });
  }

  ngOnInit() {
    this.getSignalsId();
    this.connSignals();
    this.anSignals();
  }

  getSignalsId() {
    this.route.params.forEach((params: Params) => {
      this.idSignal = params['signalId'];
    });
  }
  
  getSignalById() {
    this.signalsService.getById(this.idSignal).subscribe(data => {
      data ? this.signal = data : {};
    });
  }

  getSignalWithUser() {
    this.signalsService.getUserBySignal(this.idSignal).subscribe(data => {
      data ? this.contentUser = data : {};
      this.orderData(this.contentUser);
      this.contentUser.fama.firsttwo = [];
      this.contentUser.fama.last = [];
      this.contentUser.fama.firsttwo = this.contentUser.fama.splice(0, 2);
      this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
    });
  }

  connSignals() {
    this.signalsService.JoinComm(this.idSignal);
    this.connectionCom = this.signalsService.getSignalsCommen().subscribe(data => {
      this.getSignalCommentCount();
      this.getCommentWithUser();
      this.commentById.push(data);
    });
  }

  anSignals(){
    this.connectionAns = this.signalsService.getSignalsAns().subscribe(data => {
      this.signalsAnswer = data;
      let index = this.commentById.findIndex(cpn=>cpn.id = this.signalsAnswer.comentarioSenalId);
      this.commentById[index].res.push(data);
      this.getUserAnswer(index);
    });
  }

  getSignalCommentById() {
    this.signalsService.getSignalsComment(this.idSignal).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        let commentId = this.commentById[index].id;
        this.getSignalsAnwer(commentId, index);
      });
    });
  }

  getCommentWithUser() {
    this.signalsService.getSignalsComment(this.idSignal).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        let userByComment = this.commentById[index].userId;
        this.getUserComm(userByComment, index);
      });
    });
  }

  getUserComm(idUser, index) {
    this.userService.getById(idUser).subscribe(data => {
      this.commentById[index].user = [];
      this.commentById[index].user = data;
      this.orderData(this.commentById[index].user);
      this.commentById[index].user.fama.firsttwo = [];
      this.commentById[index].user.fama.firsttwo = this.commentById[index].user.fama.splice(0, 2);
    });
  }

  getSignalsAnwer(commentId, index) {
    this.signalsService.getSignalsAnswer(commentId).subscribe(data => {
      data.user = {};
      this.commentById[index].res = [];
      this.commentById[index].res = data;
      this.getUserAnswer(index);
    });
  }

  getUserAnswer(index){
    this.commentById[index].res.forEach((element, index1) => {
      let userByAnswer = this.commentById[index].res[index1].userId;
    this.userService.getById(userByAnswer).subscribe(data => {
      this.commentById[index].res[index1].user = data;
      this.orderData(this.commentById[index].res[index1].user);
      this.commentById[index].res[index1].user.fama.firsttwo = [];
      this.commentById[index].res[index1].user.fama.firsttwo = this.commentById[index].res[index1].user.fama.splice(0, 2);
     });
    });
  }

  sendComment() {
    this.comment.signalId = this.idSignal;
    this.signalsService.postSignalsComment(this.comment).subscribe(data => {
      this.comment = {};
    });
  }

  sendAnswer(event) {
    this.answer.comentarioSenalId = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].id;
    this.answer.contenido = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].value;
    this.signalsService.postSignalsAnswer(this.answer).subscribe(data => {
      this.answer = {};
    });
  }
  
  getSignalCommentCount() {
    this.signalsService.getSignalsCommentCount(this.idSignal).subscribe(data => {
      this.count = data;
    })
  }

  sendLike() {
    this.signalsService.postLikes(this.idSignal).subscribe(data => {
      this.like = data;
      this.signal = data;
    });
  }

  sendDislike() {
    this.signalsService.postDislikes(this.idSignal).subscribe(data => {
      this.dislike = data;
      this.signal = data;
    });
  }

  getInitials(name) {
    if (name) {
      var names = name.split(' ');
      return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
    }
    return '';
  }

  orderData(obj) {
    obj.fama.sort(function (a, b) {
      return a.valor < b.valor;
    });
  }

}
