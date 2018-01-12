import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  news:any;
  table:String = "news";

  constructor(private http: Http, private noticiasService: NoticiasService) {
    this.noticiasService.getNoticias().then((noticias) => {
      this.news = noticias;
    });
  }
}
