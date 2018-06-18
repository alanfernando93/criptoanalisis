import { Component, OnInit } from '@angular/core';

import { NewsService } from '../news.service';
import { orderData } from '../../../common/array';

@Component({
  selector: 'ngx-news-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  news: any;
  contentUser: any;
  count: any;
  limit: number = 6;
  increment: number = 0;
  connection: any;

  constructor(

    private newsService: NewsService,
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
        const newsId = this.news[index].id;
        this.userByNews(newsId, index);
      });
      this.increment += this.limit;
    });
  }

  newsSocket() {
    this.connection = this.newsService.getNews().subscribe(data => {
      const datos: any = data;
      this.news.unshift(data);
      this.news.forEach((element, index) => {
        this.userByNews(datos.usuarioId, index);
      });
    });
  }

  userByNews(newsId, index) {
    this.newsService.getUserByNews(newsId).subscribe(data => {
      this.contentUser = data;
      orderData(this.contentUser);
      this.contentUser.fama.firstTwo = [];
      this.contentUser.fama.last = [];
      this.contentUser.fama.firstTwo = this.contentUser.fama.splice(0, 2);
      this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
      this.news[index].contentUser = [];
      this.news[index].contentUser.push(data);
      this.newsService.getNewsCommentCount(newsId).subscribe(count => {
        this.news[index].count = [];
        this.news[index].count.push(count);
      });
    });
  }

  Upload() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(newsAll => {
      newsAll.forEach(element => {
        const idNews = element.id;
        this.newsService.getUserByNews(idNews).subscribe(user => {
          element.contentUser = [];
          element.contentUser.push(user);
          orderData(element.contentUser[0]);
          element.contentUser[0].fama.firstTwo = [];
          element.contentUser[0].fama.last = [];
          element.contentUser[0].fama.firstTwo = element.contentUser[0].fama.splice(0, 2);
          element.contentUser[0].fama.last = element.contentUser[0].fama.splice(0, element.contentUser[0].fama.length);
          this.newsService.getNewsCommentCount(idNews).subscribe(upload => {
            element.count = [];
            element.count.push(upload);
          });
        });
        this.news.push(element);
      });
      this.increment += this.limit;
    });
  }

  getCount() {
    this.newsService.getNewsCount().subscribe(data => {
      this.count = data.count;
    });
  }

}
