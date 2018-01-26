import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  news: any;
  table: String = "news";

  constructor(private http: Http, private noticiasService: NewsService) {
  }

  ngOnInit() {
    this.noticiasService.getNoticias().then((noticias) => {
      this.news = noticias;
    });
  }
}
