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

  constructor(
      private http: Http, 
      private newsService: NewsService
  ) {
  }
  ngOnInit(){
    this.getNews()
    //this.getNews()
  }
/*
  getNews(){
    this.newsService.getNews().subscribe(data => {
      this.news = data;     
    });     
  }
  */

  getNews(){
    this.newsService.getNews().subscribe(
      res => {
        if(!res){

        }else{
          this.news = res;
        }
      },
      error => {
        console.log(<any>error);
        console.log("la conexion no fue posible");
      }
    );
  }
}
