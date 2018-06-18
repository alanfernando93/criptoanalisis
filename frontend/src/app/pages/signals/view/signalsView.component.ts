import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SignalsService } from '../signals.service';
import { UserService } from '../../../@core/data/users.service';
import { orderData } from '../../../common/array';

@Component({
  selector: 'ngx-signalsView',
  templateUrl: './signalsView.component.html',
  styleUrls: ['./signalsView.component.scss'],
})
export class SignalsViewComponent implements OnInit {

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
    private userService: UserService) {
      route.params.subscribe(val => {
        this.idSignal = val.signalId;
        this.getSignalCommentById();
        this.getSignalWithUser();
        this.getSignalCommentCount();
        this.getCommentWithUser();
      });
  }

  ngOnInit() {
    this.connSignals();
    this.anSignals();
  }

  getSignalById(event) {
    this.signalsService.getById(this.idSignal).subscribe(data => {
      event.target.closest('nb-card').remove();
      data ? this.signal = data : {};
    });
  }

  getSignalWithUser() {
    this.signalsService.getUserBySignal(this.idSignal).subscribe(data => {
      data ? this.contentUser = data : {};
      orderData(this.contentUser);
      this.contentUser.fama.firsttwo = [];
      this.contentUser.fama.last = [];
      this.contentUser.fama.firsttwo = this.contentUser.fama.splice(0, 2);
      this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
    });
  }

  connSignals() {
    this.signalsService.JoinComm(this.idSignal);
    this.connectionCom = this.signalsService.getSignalsCommen().subscribe(data => {
      const commData: any = data;
      this.commentById.push(data);
      this.getSignalCommentCount();
      this.getUserComm(commData.userId, this.commentById.length - 1);
    });
  }

  anSignals() {
    this.connectionAns = this.signalsService.getSignalsAns().subscribe(data => {
      const comPosition = data['positionComment'];
      this.signalsAnswer = data;
      if (this.commentById[comPosition].res === undefined) {
        this.commentById[comPosition].res = [];
      }
      this.commentById[comPosition].res.push(data);
      this.getUserAnswer(comPosition);
    });
  }

  getSignalCommentById() {
    this.signalsService.getSignalsComment(this.idSignal).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        const commentId = this.commentById[index].id;
        this.getSignalsAnwer(commentId, index);
      });
    });
  }

  getCommentWithUser() {
    this.signalsService.getSignalsComment(this.idSignal).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        const userByComment = this.commentById[index].userId;
        this.getUserComm(userByComment, index);
      });
    });
  }

  getUserComm(idUser, index) {
    this.userService.getById(idUser).subscribe(data => {
      this.commentById[index].user = [];
      this.commentById[index].user = data;
      orderData(this.commentById[index].user);
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

  getUserAnswer(index) {
    this.commentById[index].res.forEach((element, index1) => {
      const userByAnswer = this.commentById[index].res[index1].userId;
    this.userService.getById(userByAnswer).subscribe(data => {
      this.commentById[index].res[index1].user = data;
      orderData(this.commentById[index].res[index1].user);
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
    this.answer.signalId = this.idSignal;
    this.answer.comentarioSenalId = event.id;
    this.answer.positionComment = event.name;
    this.answer.contenido = event.value;
    this.signalsService.postSignalsAnswer(this.answer).subscribe(data => {
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

}
