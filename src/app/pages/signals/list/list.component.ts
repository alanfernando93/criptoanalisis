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
  limit: number = 10;
  increment: number = 0;
  contentUser: any;

  constructor(
    private http: Http,
    private signalsService: SignalsService) {
  }

  ngOnInit() {
    this.getSignals();
  }

  getSignals() {
    this.signalsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data ? this.signals = data : '';
      this.signals.forEach((element, index) => {
        let signalId = this.signals[index].id;
        this.signalsService.getUserBySignal(signalId).subscribe(data => {
          this.contentUser = data;
          this.contentUser.fama.sort(function (a, b) {
            return a.valor < b.valor;
          });
          this.contentUser.fama.firstTwo = [];
          this.contentUser.fama.last = [];
          this.contentUser.fama.firstTwo = this.contentUser.fama.splice(0, 2);
          this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
          this.signals[index].contentUser = [];
          this.signals[index].contentUser.push(data);
          this.signalsService.getSignalsCommentCount(signalId).subscribe(data => {
            this.signals[index].count = [];
            this.signals[index].count.push(data);
          })
        });
      });

      this.increment += this.limit;
    });
  }

  Upload() {
    this.signalsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data.forEach(element => {
        let idSignal = element.id;
        this.signalsService.getUserBySignal(idSignal).subscribe(data => {
          element.contentUser = [];
          element.contentUser.push(data);
          this.signalsService.getSignalsCommentCount(idSignal).subscribe(data => {
            element.count = [];
            element.count.push(data);
          });
        });
        this.signals.push(element);
      });
      this.increment += this.limit;
    });
  }

}
