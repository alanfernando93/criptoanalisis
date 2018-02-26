import { Component, OnInit, OnChanges } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { NewsService } from '../news.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnChanges {

  private token = environment.usertoken;
  new: any;
  comment: any;

  like:number = 0;


  constructor(private http: Http, private route: ActivatedRoute, private newsService: NewsService, ) {

  }
  ngOnInit() {
    this.getNewsById()
  }

  ngOnChanges(){
    
  }

  getNewsById() {
    this.route.params.forEach((params: Params) => {
      let id = params['newId'];
      this.newsService.getNewsId(id).subscribe((news) => {
        this.new = news;
      });
    });
  }
  
}
