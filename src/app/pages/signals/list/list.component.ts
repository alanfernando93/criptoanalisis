import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { SignalsService } from '../signals.service';
import { UserService } from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  signals: any;
  connection;
  limit: number = 12;
  increment: number = 0;
  contentUser: any;

  constructor(
    private http: Http,
    private signalsService: SignalsService) {
  }

  ngOnInit() {
    this.getSignals();
    this.connSignals();
  }

  getSignals() {
    this.signalsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data ? this.signals = data : {};
      this.signals.forEach((element, index) => {
        let signalId = this.signals[index].id;
        this.userBySignals(signalId, index);
      });
      this.increment += this.limit;
    });
  }

  connSignals() {
    this.connection = this.signalsService.getSignals().subscribe(data => {
      let datos: any = data; 
      this.signals.unshift(data);
      //console.log(data);
      this.signals.forEach((element, index) => {
        this.userBySignals(datos.usuarioId, index);
      });
    });
  }

  userBySignals(signalId, index) {
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
      });
    });
  }

  Upload() {
    this.signalsService.getAllLimit(this.limit, this.increment).subscribe(data => {
      data.forEach(element => {
        let idSignal = element.id;
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

  getImage(id) {
    return this.signalsService.getApiRest() + 'Containers/signal' + id + '/download/perfil.png';
  }

}
