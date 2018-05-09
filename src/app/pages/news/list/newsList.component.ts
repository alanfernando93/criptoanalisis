import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NewsService } from "../news.service";
import { UserService } from "../../../@core/data/users.service";

import { DropboxCripto } from '../../../common/dropbox';

@Component({
  selector: 'ngx-newsList',
  templateUrl: './newsList.component.html',
  styleUrls: ['./newsList.component.scss']
})
export class newsListComponent implements OnInit {

  news: any;
  connection;
  limit: number = 12;
  increment: number = 0;
  contentUser: any;
  count: any;

  constructor(
    private http: Http,
    private newsService: NewsService,
    private dropbox: DropboxCripto
  ) { }

  ngOnInit() {
    this.getNews();
    this.connNews();
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

  connNews(){
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
      this.contentUser.fama.sort(function (a, b) {
        return a.valor < b.valor;
      });
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
          element.contentUser[0].fama.sort(function (a, b) {
            return a.valor < b.valor;
          });
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

  getImage(id){
    // return this.newsService.getApiRest() + 'Containers/news' + id + '/download/perfil.png';
    // this.dropbox.getImageUrlTemporary('news',this.newsService.getUserId() +'-perfil-'+id).then(resp => {
      // console.log(resp);
    //   return resp;
    // })
  }

  getCount(){
    this.newsService.getNewsCount().subscribe(data => {
      this.count = data.count;
    });
  }

}