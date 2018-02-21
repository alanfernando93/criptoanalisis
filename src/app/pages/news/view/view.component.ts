import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  news: any;
  id: number;

  constructor(private http: Http, private route: ActivatedRoute) {
    }

    ngOnInit() {
  
    }
}
