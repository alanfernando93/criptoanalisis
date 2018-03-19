import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SignalsService } from '../signals.service';


@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  signal: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private signalsService: SignalsService) {

  }

  ngOnInit() {
    this.getSignalById();
  }

  getSignalById() {
    this.route.params.forEach((params: Params) => {
      let id = params['signalId'];
      this.signalsService.getById(id).subscribe(
        signal => {
          signal ? this.signal = signal : '';
        });
    });
  }
}
