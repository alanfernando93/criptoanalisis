import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NewsService } from "../news.service";

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  news: any;
  dislike:any;

  constructor(private http: Http, private newsService: NewsService ) {
  }
  ngOnInit(){
    this.getNews()
  }

  getNews(){
    this.newsService.getNews().subscribe(data => {
      this.news = data;     
    });     
  }
}
