import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarketsService } from '../markets.service';

@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {

    market:any;

    constructor(
        private http: Http,
        private marketsService: MarketsService
    ){    
    }

    ngOnInit(){
        this.getMarket()
    }

    getMarket(){
        this.marketsService.getMarkets().subscribe(data => {
            this.market = data;
        });
    }
}