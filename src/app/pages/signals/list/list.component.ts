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
  count: any;

  constructor(
    private http: Http,
    private signalsService: SignalsService) {
  }

  ngOnInit() {
    this.getSignals();
  }

  getSignals() {
    this.signalsService.getAll().subscribe(signals => {
      signals ? this.signals = signals : '';
      this.signals.forEach((element, index) => {
        let signalId = this.signals[index].id;
        this.signalsService.getUserBySignal(signalId).subscribe(data => {
          this.signals[index].contentUser = [];
          this.signals[index].contentUser.push(data);
          this.signalsService.getSignalsCommentCount(signalId).subscribe(data => {
            this.count = data;
          });
        })
      });
    });
  }

}
