import { Component, OnInit } from '@angular/core';

import { NewsService } from '../news/news.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  news: any;
  // signals: any;
  limit: number = 5;
  increment: number = 0;

  constructor(
    private newsService: NewsService,
  ) {

  }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data ? this.news = data : {};
      this.news.forEach((element, index) => {
        const newsId = this.news[index].id;
        this.newsService.getUserByNews(newsId).subscribe(user => {
          this.news[index].contentUser = [];
          this.news[index].contentUser.push(user);
        });
      });
    });
  }
}
