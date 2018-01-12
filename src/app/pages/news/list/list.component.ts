import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  news: any;
  table: String = "news";

  constructor(private http: Http, private noticiasService: NoticiasService) {
  }

  ngOnInit() {
    this.noticiasService.getNoticias().then((noticias) => {
      this.news = noticias;
    });
  }
}
