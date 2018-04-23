import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NewsService } from "../news.service";
import { UserService } from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  news: any;
  limit: number = 10;
  increment: number = 0;
  contentUser: any;

  constructor(
    private http: Http,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data ? this.news = data : {};
      this.news.forEach((element, index) => {
        let newsId = this.news[index].id;
        this.newsService.getUserByNews(newsId).subscribe(data => {
          this.contentUser = data;
          this.contentUser.fama.sort(function (a, b) {
            return a.valor < b.valor;
          });
          this.contentUser.fama.firstTwo = [];
          this.contentUser.fama.last = [];
          this.contentUser.fama.firstTwo = this.contentUser.fama.splice(0, 2);
          this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
          this.news[index].contentUser = [];
          this.news[index].contentUser.push(data);
          this.newsService.getNewsCommentCount(newsId).subscribe(data => {
            this.news[index].count = [];
            this.news[index].count.push(data);
          });
        });
      });
      this.increment += this.limit;
    });
  }

  Upload() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data.forEach(element => {
        let idNews = element.id;
        this.newsService.getUserByNews(idNews).subscribe(data => {
          element.contentUser = [];
          element.contentUser.push(data);
          element.contentUser[0].fama.sort(function (a, b) {
            return a.valor < b.valor;
          });
          element.contentUser[0].fama.firstTwo = [];
          element.contentUser[0].fama.last = [];
          element.contentUser[0].fama.firstTwo = element.contentUser[0].fama.splice(0, 2);
          element.contentUser[0].fama.last = element.contentUser[0].fama.splice(0, element.contentUser[0].fama.length);
          this.newsService.getNewsCommentCount(idNews).subscribe(data => {
            element.count = [];
            element.count.push(data);
          });
        });
        this.news.push(element);
      });
      this.increment += this.limit;
    });
  }

  getImage(id){
    return this.newsService.getApiRest() + 'Containers/news' + id + '/download/perfil.png';
  }

}
