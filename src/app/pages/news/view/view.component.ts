import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NewsService } from '../news.service';
import { UserService } from '../../../@core/data/users.service';
import * as nbUser from '@nebular/theme/components/user/user.component'

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  news: any;
  commentById: any = [];
  count: number;
  idNews: any;
  contentUser: any;
  answerUser: any;
  like: number;
  dislike: number;
  comment: any = {};
  respond: any = {};
  answer: any = {};

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private userService: UserService) {
      route.params.subscribe(val=>{
        console.log(val);
        this.idNews = val.newsId;
        this.getNewsById();
        this.getNewsCommentById();
        this.getNewsCommentCount();
        this.getNewsWithUser();
        this.getCommentWithUser();
      });
  }
  ngOnInit() {
  }

  getNewsById() {
    this.newsService.getById(this.idNews).subscribe(data => {
      data ? this.news = data : '';
    });
  }

  getNewsCommentById() {
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : {};
      this.commentById.forEach((element, index) => {
        let commentId = this.commentById[index].id;
        this.newsService.getNewsAnswer(commentId).subscribe(data => {
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
    this.newsService.getNewsComment(this.idNews).subscribe(data => {
      data ? this.commentById = data : '';
      this.commentById.forEach((element, index) => {
        let userByComment = this.commentById[index].userId;
        this.userService.getById(userByComment).subscribe(data => {
          this.commentById[index].user = [];
          this.commentById[index].user = data;
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
    this.newsService.postNewsComment(this.comment.noticiaId, this.comment).subscribe(data => {
      this.commentById.push(data);
      this.getNewsCommentCount();
      this.getCommentWithUser();
      this.getNewsCommentById();
      this.comment = {};
    });
  }

  sendAnswer(event) {
    this.respond.comentarioNoticiaId = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].id;
    this.respond.contenido = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].value;
    this.newsService.postNewsAnswer(this.respond.comentarioNoticiaId, this.respond).subscribe(data => {
      this.commentById.push(data);
      this.getNewsCommentById();
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
  follow(id: number){
    this.newsService.followUser(id)
    .subscribe(data=>{
      console.log(data);
    })
  }
}
