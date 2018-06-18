import { Component, OnInit } from '@angular/core';

import { MarketsService } from '../markets.service';

@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

    market: any;

    constructor(
        private marketsService: MarketsService,
    ) {
    }

    ngOnInit() {
        this.getMarket();
    }

    getMarket() {
        this.marketsService.getMarkets().subscribe(
            res => {
                if (!res) {

                } else {
                    this.market = res;
                }
            },
            error => {
            },
        );
    }
}
