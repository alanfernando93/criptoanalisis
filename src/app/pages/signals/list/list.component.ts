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

  constructor(
    private http: Http, 
    private signalsService: SignalsService) {
  }

  ngOnInit() {
    this.getSignals();
  }

  getSignals() {
    this.signalsService.getAll().subscribe(
      res => {
        if(!res) {

        }else {
          this.signals = res;
        }
      },
      error => {
        console.log("no pudo cargar las señales");
      }
    );
  }  
}
