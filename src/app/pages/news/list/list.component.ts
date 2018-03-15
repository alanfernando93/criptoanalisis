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
  user: any;
  
  constructor(
    private http: Http,
    private newsService: NewsService
  ) {
  }
  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getAll().subscribe(
      news => {
        if (!news) {

        } else {
          this.news = news;
          this.newsService.getUserById(news.usuarioId).subscribe(
            user => {
              if(!user){

              }else {
                this.user = user;
              }
            },
            error => {
              console.log("no pudo cargar el usuario");
            }
          )
        }
      },
      error => {
        console.log("no pudo cargar las noticias");
      }
    );
  }
}
