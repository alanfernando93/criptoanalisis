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
  count: any = [];

  constructor(
    private http: Http,
    private newsService: NewsService
  ) {
  }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getAll().subscribe(news => {
      news ? this.news = news : '';
      this.news.forEach((element, index) => {
        let newsId = this.news[index].id;
        this.newsService.getNewsCommentCount(newsId).subscribe(data => {
          this.news[index].count = []
          this.news[index].count.push(data)
          console.log(this.news);
        });
      });
    });
  }

}
