import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { NewsService } from '../news.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  private token = environment.usertoken;
  
  new: any;
  like:number;
  dislike:number;

  constructor(private http: Http, private route: ActivatedRoute, private newsService: NewsService, ) {

  }
  ngOnInit() {
    this.getNewsById(),
    this.sendDislike()
  }

  getNewsById() {
    this.route.params.forEach((params: Params) => {
      let id = params['newId'];
      this.newsService.getNewsId(id).subscribe((news) => {
        this.new = news;
      });
    });
  }

  sendDislike(){
    this.route.params.forEach((params: Params) => {
      let id = params['newId'];
    this.newsService.postDislikes(id).subscribe(data => {
      this.dislike = data;
      this.new=data;
      });
    });
  }

  sendLike(){
    this.route.params.forEach((params: Params) => {
      let id = params['newId'];
    this.newsService.postLikes(id).subscribe(data => {
      this.like = data;
      this.new=data;
      });
    });
  }

}
