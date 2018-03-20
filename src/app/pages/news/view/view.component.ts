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


  private userId = environment.userId;

  news: any;
  user: any;
  like: number;
  dislike: number;
  commentById: any = [];
  answers: any;
  count: any;
  idNews: any;

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
  }

  getNewsById() {
    this.newsService.getById(this.idNews).subscribe(
      news => {
        news ? this.news = news : '';
      });
  }

  getNewsCommentById() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      this.commentById = data;
      this.commentById.forEach((element, index) => {
        let commentId = this.commentById[index].id;
        this.newsService.getNewsAnswer(commentId).subscribe(data => {
          this.answers = data;
          this.commentById[index].res = [];
          this.commentById[index].res = data;
        });
      });
    });
  }
  sendAnswer() {
    this.commentById.forEach((element, index) => {
      let commentId = this.commentById[index].id;
      this.answer.comentarioNoticiaId = commentId;
      this.answer.userId = this.userId;
      console.log(this.answer);
      /*
      this.newsService.postNewsAnswer(this.answer.comentarioNoticiaId, this.answer).subscribe(data => {
  
      });*/
    });
  }

  getNewsCommentCount() {
    this.newsService.getNewsCommentCount(this.idNews).subscribe(data => {
      this.count = data;
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
    });
  }

  sendComent() {
    this.comment.userId = this.userId;
    this.comment.noticiaId = this.idNews;
    this.newsService.postNewsComment(this.comment.noticiaId, this.comment).subscribe(data => {
    });
  }



}
