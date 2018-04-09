import { Component, OnInit, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SignalsService } from '../signals.service';
import { UserService } from '../../../@core/data/users.service';

import * as nbUser from '@nebular/theme/components/user/user.component'

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  signal: any;
  commentById: any = [];
  count: number;
  idSignal: any;
  contentUser: any;
  like: number;
  dislike: number;
  commentId: number;
  userByComment: number;
  comment: any = {};
  respond: any = {};
  answer: any = {};

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private signalsService: SignalsService,
    private userService: UserService, ) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.idSignal = params['signalId'];
    });
    this.getSignalById();
    this.getSignalWithUser();
    this.getSignalCommentById();
    this.getCommentWithUser();
    this.getSignalCommentCount();
  }

  getSignalById() {
    this.signalsService.getById(this.idSignal).subscribe(data => {
      data ? this.signal = data : {};
    });
  }

  getSignalCommentById() {
    this.signalsService.getSignalsComment(this.idSignal).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        let commentId = this.commentById[index].id;
        this.signalsService.getSignalsAnswer(commentId).subscribe(data => {
          data.user = {}
          this.commentById[index].res = [];
          this.commentById[index].res = data;
          this.commentById[index].res.forEach((element, index1) => {
            let userByAnswer = this.commentById[index].res[index1].userId;
            this.userService.getById(userByAnswer).subscribe(data => {
              this.commentById[index].res[index1].user = data;
            });
          });
        });
      });
    });
  }

  getCommentWithUser() {
    this.signalsService.getSignalsComment(this.idSignal).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        this.userByComment = this.commentById[index].userId;
        this.userService.getById(this.userByComment).subscribe(data => {
          this.commentById[index].user = [];
          this.commentById[index].user = data;
        });
      });
    });
  }

  getSignalCommentCount() {
    this.signalsService.getSignalsCommentCount(this.idSignal).subscribe(data => {
      this.count = data;
    })
  }

  getSignalWithUser() {
    this.signalsService.getUserBySignal(this.idSignal).subscribe(data => {
      this.contentUser = data;
    });
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

  sendComment() {
    this.comment.signalId = this.idSignal;
    this.signalsService.postSignalsComment(this.idSignal, this.comment).subscribe(data => {
      this.commentById.push(data);
      this.getSignalCommentCount();
      this.getCommentWithUser();
      this.comment = {};
    });
  }

  sendAnswer(event) {
    this.respond.comentarioSenalId = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].id;
    this.respond.contenido = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].value;
    this.signalsService.postSignalsAnswer(this.respond.comentarioSenalId, this.respond).subscribe(data => {
      this.commentById.push(data);
      this.getSignalCommentById();
      this.getCommentWithUser();
      this.respond = {};
    });
  }

  getInitials(name) {
    if (name) {
      var names = name.split(' ');
      return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
    }
    return '';
  }

}
