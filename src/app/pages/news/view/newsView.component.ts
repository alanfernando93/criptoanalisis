import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NewsService } from '../news.service';
import { UserService } from '../../../@core/data/users.service';
import * as nbUser from '@nebular/theme/components/user/user.component'

@Component({
  selector: 'ngx-newsView',
  templateUrl: './newsView.component.html',
  styleUrls: ['./newsView.component.scss']
})
export class newsViewComponent implements OnInit {

  news: any;
  commentById: any = [];
  count: number;
  idNews: any;
  contentUser: any;
  like: number;
  dislike: number;
  comment: any = {};
  respond: any = {};
  answer: any = {};
  newsAnswer: any;
  connectionCom;
  connectionAns;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private userService: UserService) {
  }
  ngOnInit() {
    this.getNewsId();
    this.getNewsById();
    this.getNewsCommentCount();
    this.getNewsWithUser();
    this.getNewsCommentById();
    this.getCommentWithUser();
    this.connNews();
    this.ansNews();
  }

  getNewsId() {
    this.route.params.forEach((params: Params) => {
      this.idNews = params['newsId'];
    });
  }

  connNews() {
    this.newsService.JoinComm(this.idNews);
    this.connectionCom = this.newsService.getNewsComen().subscribe(data => {
      this.getNewsCommentCount();
      this.getCommentWithUser();
      this.commentById.push(data);
    });
  }

  ansNews() {
    this.connectionAns = this.newsService.getNewsAns().subscribe(data => {
      this.newsAnswer = data;
      let index = this.commentById.findIndex(cpn => cpn.id = this.newsAnswer.comentarioNoticiaId);
      this.commentById[index].res.push(this.newsAnswer);
      this.getUserAnswer(index);
    });
  }

  getNewsById() {
    this.newsService.getById(this.idNews).subscribe(data => {
      data ? this.news = data : {};
    });
  }

  getNewsCommentById() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        let commentId = this.commentById[index].id;
        this.getAnswer(commentId, index)
      });
    });
  }

  getAnswer(commentId, index) {
    this.newsService.getNewsAnswer(commentId).subscribe(data => {
      data.user = {};
      this.commentById[index].res = [];
      this.commentById[index].res = data;
      this.getUserAnswer(index);
    });
  }

  getUserAnswer(index) {
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

  getCommentWithUser() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        let userByComment = this.commentById[index].userId;
        this.getUserComm(userByComment, index);
      });
    });
  }

  getUserComm(IdUser, index) {
    this.userService.getById(IdUser).subscribe(data => {
      this.commentById[index].user = [];
      this.commentById[index].user = data;
      this.orderData(this.commentById[index].user);
      this.commentById[index].user.fama.firsttwo = [];
      this.commentById[index].user.fama.firsttwo = this.commentById[index].user.fama.splice(0, 2);
    });
  }

  getNewsWithUser() {
    this.newsService.getUserByNews(this.idNews).subscribe(data => {
      data ? this.contentUser = data : {};
      this.orderData(this.contentUser);
      this.contentUser.fama.firsttwo = [];
      this.contentUser.fama.last = []
      this.contentUser.fama.firsttwo = this.contentUser.fama.splice(0, 2);
      this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
    });
  }

  getNewsCommentCount() {
    this.newsService.getNewsCommentCount(this.idNews).subscribe(data => {
      this.count = data;
    });
  }

  sendLike() {
    this.newsService.postLikes(this.idNews).subscribe(data => {
      this.like = data;
      this.news = data;
    });
  }

  sendDislike() {
    this.newsService.postDislikes(this.idNews).subscribe(data => {
      this.dislike = data;
      this.news = data;
    });
  }

  sendComent() {
    this.comment.noticiaId = this.idNews;
    this.newsService.postNewsComment(this.comment).subscribe(data => {
      this.comment = {};
    });
  }

  sendAnswer(event) {
    this.respond.noticiaId = this.idNews;
    this.respond.comentarioNoticiaId = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].id;
    this.respond.contenido = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].value;
    this.newsService.postNewsAnswer(this.respond).subscribe(data => {
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

  orderData(obj) {
    obj.fama.sort(function (a, b) {
      return a.valor < b.valor;
    });
  }

}
