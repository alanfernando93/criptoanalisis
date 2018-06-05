import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MarketsService } from '../../../pages/markets/markets.service';

@Component({
    selector: "ngx-headertwo",
    styleUrls: ["./headertwo.component.scss"],
    templateUrl: "./headertwo.component.html",
    providers: [MarketsService]
})
export class HeaderTwoComponent implements OnInit {
    @Input() position = "normal";

    markets: any;

    constructor(
        public router: Router,
        private marketsService: MarketsService
    ) { }

    ngOnInit() {
        this.getMarket();
    }

    routerLink(url) {
        this.router.navigate([url]);
    }

    getMarket() {
        this.marketsService.getMarkets().subscribe(markets => {
            markets ? this.markets = markets : '';
        }, error => { });
    }
}