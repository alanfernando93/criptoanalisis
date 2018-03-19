import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { NewsService } from "../news.service";
import { UserService } from "../../../@core/data/users.service";

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
    private newsService: NewsService,
    private userService: UserService
  ) {
  }
  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getAll().subscribe(
      news => {
       news ? this.news = news : '';
      }
    );
  }
  getUser(){
    this.news.forEach( (data,index) => {
      this.userService.getById(data.usuarioId).subscribe(
        data => {
          if(!data ) {

          }else {
            this.news[index].user = data;
          }
          error => {
            console.log("no pudo cargar los usuarios");
          }
        }
      );      
    });
  }

}
