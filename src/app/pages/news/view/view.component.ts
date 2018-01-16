import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  news: any;
  id: number;

  constructor(private http: Http, private route: ActivatedRoute, private noticiasService: NoticiasService) {
    this.route.params.subscribe((param) => {
      this.id = param['idNew'];
      console.log(this.id);

      })
    }

    ngOnInit() {
      this.noticiasService.getNoticias().then((noticias) => {
        this.news = noticias;
      })
    }
}
