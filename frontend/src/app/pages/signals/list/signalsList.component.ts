import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { SignalsService } from '../signals.service';

@Component({
  selector: 'ngx-signalsList',
  templateUrl: './signalsList.component.html',
  styleUrls: ['./signalsList.component.scss'],
})
export class SignalsListComponent implements OnInit {

  signals: any;
  connection: any;
  limit: number = 12;
  increment: number = 0;
  contentUser: any;
  position: any;
  count: any;

  constructor(
    private http: Http,
    private signalsService: SignalsService) {
  }

  ngOnInit() {
    this.getCount();
    this.getSignals();
    this.connSignals();
  }

  getSignals() {
    this.signalsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data ? this.signals = data : {};
      this.signals.forEach((element, index) => {
        const signalId = this.signals[index].id;
        this.userBySignals(signalId, index);
        this.getPosition(signalId, index);
      });
      this.increment += this.limit;
    });
  }

  connSignals() {
    this.connection = this.signalsService.getSignals().subscribe(data => {
      const datos: any = data;
      this.signals.unshift(data);
      this.signals.forEach((element, index) => {
        this.userBySignals(datos.usuarioId, index);
      });
    });
  }

  userBySignals(signalId, index) {
    this.signalsService.getUserBySignal(signalId).subscribe(data => {
      this.contentUser = data;
      this.contentUser.totalFama = 0;
      this.contentUser.fama.forEach(element => {
        this.contentUser.totalFama += element.valor;
      });
      this.contentUser.fama.sort(function (a, b) {
        return a.valor < b.valor;
      });
      this.contentUser.fama.firstTwo = [];
      this.contentUser.fama.last = [];
      this.contentUser.fama.firstTwo = this.contentUser.fama.splice(0, 2);
      this.contentUser.fama.last = this.contentUser.fama.splice(0, this.contentUser.fama.length);
      this.signals[index].contentUser = [];
      this.signals[index].contentUser.push(data);
      this.signalsService.getSignalsCommentCount(signalId).subscribe(signal => {
        this.signals[index].count = [];
        this.signals[index].count.push(signal);
      });
    });
  }

  getPosition(id, index) {
    return this.signalsService.getPositionBySignal(id).subscribe(data => {
      this.signals[index].position = [];
      this.signals[index].position.push(data[0]);
    });
  }

  getCount() {
    this.signalsService.getSignalsCount().subscribe(data => {
      this.count = data.count;
    });
  }

  Upload() {
    this.signalsService.getAllLimit(this.limit, this.increment).subscribe(signal => {
      signal.forEach(element => {
        const idSignal = element.id;
        this.signalsService.getUserBySignal(idSignal).subscribe(data => {
          element.contentUser = [];
          element.contentUser.push(data);
          element.contentUser[0].fama.sort(function (a, b) {
            return a.valor < b.valor;
          });
          element.contentUser[0].fama.firstTwo = [];
          element.contentUser[0].fama.last = [];
          element.contentUser[0].fama.firstTwo = element.contentUser[0].fama.splice(0, 2);
          element.contentUser[0].fama.last = element.contentUser[0].fama.splice(0, element.contentUser[0].fama.length);
          this.signalsService.getSignalsCommentCount(idSignal).subscribe(upload => {
            element.count = [];
            element.count.push(upload);
          });
        });
        this.signals.push(element);
      });
      this.increment += this.limit;
    });
  }

}
