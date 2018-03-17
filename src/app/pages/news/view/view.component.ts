import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NewsService } from '../news.service';
import { UserService } from '../../../@core/data/users.service';
 
@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  news: any;
  user: any;
  like: number;
  dislike: number;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private userService: UserService) {

  }
  ngOnInit() {
    this.getNewsById();
    this.sendDislike();
    this.sendLike();
  }

  getNewsById() {
    this.route.params.forEach((params: Params) => {
      let id = params['newsId'];
      this.newsService.getById(id).subscribe(
        news => {
          if (!news) {

          } else {
            this.news = news;
            console.log(this.news);
          }
          error => {
            console.log("no pudo cargar las noticias por id");
          }
        });
    });
  }

  sendDislike() {
    this.route.params.forEach((params: Params) => {
      let id = params['newsId'];
      this.newsService.postDislikes(id).subscribe(data => {
        this.dislike = data;
        this.news = data;
      });
    });
  }

  sendLike() {
    this.route.params.forEach((params: Params) => {
      let id = params['newsId'];
      this.newsService.postLikes(id).subscribe(data => {
        this.like = data;
        this.news = data;
      });
    });
  }
}
