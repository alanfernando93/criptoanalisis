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
      res => {
        if (!res) {

        } else {
          this.news = res;
        }
      },
      error => {
        console.log("no pudo cargar la lista de noticias");
      }
    );
  }

  getSignals() {
    this.signalsService.getAll().subscribe(
      res => {
        if(!res) {

        }else{
          this.signals = res;
        }
      },
      error => {
        console.log("no pudo cargar la lista de señales");
      }
    );
  }
}
