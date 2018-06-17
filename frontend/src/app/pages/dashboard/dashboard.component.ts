import { Component, OnInit } from '@angular/core';

import { NewsService } from '../news/news.service';
import { SignalsService } from '../signals/signals.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [NewsService, SignalsService],
})
export class DashboardComponent implements OnInit {

  news: any;
  signals: any;
  limit: number = 3;
  increment: number = 0;

  constructor(
    private newsService: NewsService,
    private signalsService: SignalsService,
  ) {

  }

  ngOnInit() {
    this.getNews();
    this.getSignals();
  }

  getNews() {
    this.newsService.getAll().subscribe(news => {
      news ? this.news = news : {};
      this.news.forEach((element, index) => {
        const newsId = this.news[index].id;
        this.newsService.getUserByNews(newsId).subscribe(data => {
          this.news[index].contentUser = [];
          this.news[index].contentUser.push(data);
          this.news[index].contentUser[0].fama.sort(function (a, b) {
            return a.valor < b.valor;
          });
          this.news[index].contentUser[0].fama.firstTwo = [];
          this.news[index].contentUser[0].fama.firstTwo = this.news[index].contentUser[0].fama.splice(0, 2);
        });
      });
    });
  }

  getSignals() {
    if (!this.signalsService.isAuth()) return;
    this.signalsService.getAllLimit(this.limit, this.increment).subscribe(signalsAll => {
      signalsAll ? this.signals = signalsAll : {};
      this.signals.forEach((element, index) => {
        const signalId = this.signals[index].id;
        this.signalsService.getUserBySignal(signalId).subscribe(user => {
          this.signals[index].contentUser = [];
          this.signals[index].contentUser.push(user);
          this.signals[index].contentUser[0].fama.sort(function (a, b) {
            return a.valor < b.valor;
          });
          this.signals[index].contentUser[0].fama.firstTwo = [];
          this.signals[index].contentUser[0].fama.firstTwo = this.signals[index].contentUser[0].fama.splice(0, 2);
        });
      });
    })
  }
}
