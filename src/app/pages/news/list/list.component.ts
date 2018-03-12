import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';

import { NewsService } from "../news.service";

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  news: any;
  
  constructor(
    private http: Http,
    private newsService: NewsService
  ) {
  }
  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews().subscribe(
      res => {
        if (!res) {

        } else {
          this.news = res;
        }
      },
      error => {
        console.log("no pudo cargar las noticias");
      }
    );
  }
}
