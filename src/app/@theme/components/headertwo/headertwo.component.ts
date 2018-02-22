import { Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { MarketService } from '../../../pages/market/market.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
    selector: "ngx-headertwo",
    styleUrls: ["./headertwo.component.scss"],
    templateUrl: "./headertwo.component.html",
    providers: [MarketService]
})
export class HeaderTwoComponent implements OnInit {
    @Input() position = "normal";

    markets: any;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private analyticsService: AnalyticsService,
        private marketService: MarketService,
        private authService: NbAuthService
    ) { }

    ngOnInit() {      
        this.getMarket()
    }

    getMarket(){
        this.marketService.getMarkets().subscribe(data => {
            this.markets = data;
            console.log(data);
        });  
    }
}