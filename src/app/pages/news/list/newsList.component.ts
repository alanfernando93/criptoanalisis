import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NewsService } from "../news.service";
import { UserService } from "../../../@core/data/users.service";
import { orderData } from '../../../common/array';

@Component({
  selector: 'ngx-newsList',
  templateUrl: './newsList.component.html',
  styleUrls: ['./newsList.component.scss']
})
export class newsListComponent implements OnInit {

  news: any;
  contentUser: any;
  count: any;
  limit: number = 6;
  increment: number = 0;
  connection;

  
  constructor(
    private http: Http,
    private newsService: NewsService
  ) { 
    
    this.getNews();
    this.newsSocket();
    this.getCount();
  }

  ngOnInit() {
  }

  getNews() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data ? this.news = data : {};
      this.news.forEach((element, index) => {
        let newsId = this.news[index].id;
        this.userByNews(newsId, index);
      });
      this.increment += this.limit;
    });
  }

  newsSocket(){
    this.connection = this.newsService.getNews().subscribe(data=> {
      let datos: any = data;
      this.news.unshift(data);
      this.news.forEach((element, index) => {
        this.userByNews(datos.usuarioId, index);
      });
    });
  }

  userByNews(newsId, index){
    this.newsService.getUserByNews(newsId).subscribe(data => {
      this.contentUser = data;
      orderData(this.contentUser);
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
  }

  Upload() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data.forEach(element => {
        let idNews = element.id;
        this.newsService.getUserByNews(idNews).subscribe(data => {
          element.contentUser = [];
          element.contentUser.push(data);
          orderData(element.contentUser[0]);
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

  getCount(){
    this.newsService.getNewsCount().subscribe(data => {
      this.count = data.count;
    });
  }

}