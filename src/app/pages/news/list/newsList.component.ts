import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NewsService } from "../news.service";
import { UserService } from "../../../@core/data/users.service";
import { orderData } from '../../../common/array';

@Component({
  selector: 'ngx-newsList',
  template: `<ngx-newsAll [listNews]="news" design="col-lg-4 col-md-4 col-sm-6" precision="news.contentUser.precision.valor"></ngx-newsAll>
  <nb-card *ngIf="count > 6">
    <nb-card-body>
      <div class="row block-level-buttons">
        <div class="col-md-12">
          <button type="button" class="btn btn-outline-primary btn-block" (click)="Upload()">Ver mas</button>
        </div>
      </div>
    </nb-card-body>
  </nb-card>`,
  styles: [`    body {
    padding: 10px 0;
    background-color: #f4f4f4;
    font-family: 'Montserrat', sans-serif;
  }
  a {
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
  }
  .btn.btn-lg {
    padding: 6px 30px;
  }
  .thumbnail-title {
    font-size: 20px;
    margin-top: 5px;
  }
  .img-thumb-bg {
    padding: 0;
    overflow: hidden;
    min-height: 200px;
    position: relative;
    border-radius: 3px;
    background-position: center;
    background-color: transparent;
    width: 100%;
  }
  .img-thumb-bg p {
    color: #fff;
    margin-bottom: 0;
    line-height: 16px;
  }
  .img-thumb-bg .overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    transition: all 0.3s ease-in-out;
    background: rgba(0, 0, 0, 0);
    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, #000000 100%);
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(50%, rgba(0, 0, 0, 0)), color-stop(100%, #000000));
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000', endColorstr='#000000', GradientType=0);
  }
  .img-thumb-bg .caption {
    bottom: -5px;
    height: 110px;
    font-size: 12px;
    position: absolute;
    padding: 0 20px 20px;
    width: 100%;
    transition: all 0.3s ease-in-out;
  }
  .img-thumb-bg .caption .tag a {
    color: #fff;
    padding: 0 5px;
    font-size: 12px;
    border-radius: 2px;
    display: inline-block;
    background-color: #2980B9;
  }
  .img-thumb-bg .caption .title {
    margin-top: 5px;
    font-size: 18px;
    line-height: 20px;
    text-transform: uppercase;
    height: 60px;
    overflow: hidden;
  }
  .img-thumb-bg .caption .title a {
    color: #fff;
  }
  .img-thumb-bg .caption .title a:hover {
    color: #2980B9;
  }
  .img-thumb-bg .caption .meta-data {
    color: #ffffff;
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 15px;
    padding-right: 11px;
  }
  .img-thumb-bg .caption .meta-data a {
    color: #777;
  }
  .img-thumb-bg .caption .meta-data a .fa {
    color: #2980B9;
  }
  .img-thumb-bg .caption .meta-data a:hover {
    color: #2980B9;
  }
  .img-thumb-bg .caption .content {
    display: none;
    width: 100%;
  }
  .img-thumb-bg:hover .overlay {
    background: rgba(46, 49, 58, 0.8);
  }
  .img-thumb-bg:hover .caption {
    bottom: 60px;
  }
  .img-thumb-bg:hover .caption .content {
    display: block;
  }
  .spn-data{
    margin-top: 12px;
    margin-right: 2px;
  }`]
})
export class newsListComponent implements OnInit {

  news: any;
  contentUser: any;
  count: any;
  limit: number = 6;
  increment: number = 0;
  connection;

  
  constructor(
    private http: Http,
    private newsService: NewsService
  ) { 
    
    this.getNews();
    this.newsSocket();
    this.getCount();
  }

  ngOnInit() {
  }

  getNews() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data ? this.news = data : {};
      this.news.forEach((element, index) => {
        let newsId = this.news[index].id;
        this.userByNews(newsId, index);
      });
      this.increment += this.limit;
    });
  }

  newsSocket(){
    this.connection = this.newsService.getNews().subscribe(data=> {
      let datos: any = data;
      this.news.unshift(data);
      this.news.forEach((element, index) => {
        this.userByNews(datos.usuarioId, index);
      });
    });
  }

  userByNews(newsId, index){
    this.newsService.getUserByNews(newsId).subscribe(data => {
      this.contentUser = data;
      orderData(this.contentUser);
      this.contentUser.fama.firstTwo = [];
      this.contentUser.fama.last = [];
      this.contentUser.fama.firstTwo = this.contentUser.fama.splice(0, 2);
      this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
      this.news[index].contentUser = [];
      this.news[index].contentUser.push(data);
      this.newsService.getNewsCommentCount(newsId).subscribe(data => {
        this.news[index].count = [];
        this.news[index].count.push(data);
      });
    });
  }

  Upload() {
    this.newsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data.forEach(element => {
        let idNews = element.id;
        this.newsService.getUserByNews(idNews).subscribe(data => {
          element.contentUser = [];
          element.contentUser.push(data);
          orderData(element.contentUser[0]);
          element.contentUser[0].fama.firstTwo = [];
          element.contentUser[0].fama.last = [];
          element.contentUser[0].fama.firstTwo = element.contentUser[0].fama.splice(0, 2);
          element.contentUser[0].fama.last = element.contentUser[0].fama.splice(0, element.contentUser[0].fama.length);
          this.newsService.getNewsCommentCount(idNews).subscribe(data => {
            element.count = [];
            element.count.push(data);
          });
        });
        this.news.push(element);
      });
      this.increment += this.limit;
    });
  }

  getCount(){
    this.newsService.getNewsCount().subscribe(data => {
      this.count = data.count;
    });
  }

}