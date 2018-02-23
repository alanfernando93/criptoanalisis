import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  new: any;
  constructor(private http: Http, private route: ActivatedRoute, private noticiasService: NoticiasService,) {
      
  }
  ngOnInit(){
    this.getNewsById()
  }

    getNewsById(){
      this.route.params.forEach((params: Params) => {
        let id = params['newId'];
        this.noticiasService.getNewsId(id).subscribe((noticias) => {
          this.new = noticias;
        });
      });
    }
}
