import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NewsService } from '../news.service';
import { UserService } from '../../../@core/data/users.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  idUser = environment.userId;
  news: any;
  commentById: any = [];
  answerById: any = [];
  count: any;
  idNews: any;
  contentUser: any;
  like: number;
  dislike: number;
  commentId: number;
  userByComment: number;
  userByAnswer: Number;
  comment: any = {};
  answer: any = {};

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private userService: UserService) {

  }
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.idNews = params['newsId'];
    });
    this.getNewsById();
    this.getNewsCommentById();
    this.getNewsCommentCount();
    this.getNewsWithUser();
    this.getCommentWithUser();
  }

  getNewsById() {
    this.newsService.getById(this.idNews).subscribe(data => {
      data ? this.news = data : '';
    });
  }

  getNewsCommentById() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : '';
    });
  }

  getCommentWithUser() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : '';
      this.commentById.forEach((element, index) => {
        this.commentId = this.commentById[index].id;
        this.userByComment = this.commentById[index].userId;
        this.userService.getById(this.userByComment).subscribe(data => {
          this.commentById[index].user = [];
          this.commentById[index].user = data;
          this.newsService.getNewsAnswer(this.commentId).subscribe(data => {
            this.commentById[index].res = [];
            this.commentById[index].res = data;
            /*
            this.commentById.forEach((element, index) => {
              this.userByAnswer = this.commentById[index].userId;
              this.userService.getById(this.userByAnswer).subscribe(data => {
                this.commentById[index].anuser = [];
                this.commentById[index].anuser = data;
              });
            });
            */
          });
        });
      });
    });
  }

  getNewsCommentCount() {
    this.newsService.getNewsCommentCount(this.idNews).subscribe(data => {
      this.count = data;
    });
  }

  getNewsWithUser() {
    this.newsService.getUserByNews(this.idNews).subscribe(data => {
      this.contentUser = data;
    });
  }

  sendDislike() {
    this.newsService.postDislikes(this.idNews).subscribe(data => {
      this.dislike = data;
      this.news = data;
    });
  }

  sendLike() {
    this.newsService.postLikes(this.idNews).subscribe(data => {
      this.like = data;
      this.news = data;
      console.log(this.like);
    });
  }

  sendAnswer() {
    this.answer.userId = this.idUser;
    this.answer.comentarioNoticiaId = this.commentId;
    this.newsService.postNewsAnswer(this.answer.comentarioNoticiaId, this.answer).subscribe(data => {
      this.answer = '';
    });
  }

  sendComent() {
    this.comment.userId = this.idUser;
    this.comment.noticiaId = this.idNews;
    this.newsService.postNewsComment(this.comment.noticiaId, this.comment).subscribe(data => {
      this.comment = '';
    });
  }

}
