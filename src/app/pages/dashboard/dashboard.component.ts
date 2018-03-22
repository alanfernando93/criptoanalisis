import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NewsService } from '../news/news.service';
import { SignalsService } from '../signals/signals.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [NewsService, SignalsService]
})
export class DashboardComponent implements OnInit {

  news: any;
  signals: any;

  constructor(
    private newsService: NewsService,
    private signalsService: SignalsService
  ) {

  }

  ngOnInit() {
    this.getNews();
    this.getSignals();
  }

  getNews() {
    this.newsService.getAll().subscribe(
      news => {
        news ? this.news = news : '';
        this.news.forEach((element, index) => {
          let newsId = this.news[index].id;
          this.newsService.getNewsByUser(newsId).subscribe(data => {
            this.news[index].contentUser = [];
            this.news[index].contentUser.push(data);
            console.log(this.news);
          });
        });
      }
    );
  }

  getSignals() {
    this.signalsService.getAll().subscribe(
      signals => {
        signals ? this.signals = signals : '';
      }
    );
  }

}
