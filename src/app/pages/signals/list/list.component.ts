import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { SignalsService } from '../signals.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  signals: any;

  constructor(private http: Http, private signalsService: SignalsService) {
  }

  ngOnInit() {
    this.getSignals()
  }

  getSignals(){
    this.signalsService.getSignals().subscribe(data => {
      this.signals = data;
    });
  }
}
