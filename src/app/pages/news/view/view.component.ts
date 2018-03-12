import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';

import { NewsService } from '../news.service';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  news: any;
  like: number;
  dislike: number;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService) {

  }
  ngOnInit() {
    this.getNewsById();
    this.sendDislike();
    this.sendLike();
  }

  getNewsById() {
    this.route.params.forEach((params: Params) => {
      let id = params['newsId'];
      this.newsService.getNewsId(id).subscribe(
        news => {
          if (!news) {

          } else {
            this.news = news;
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
