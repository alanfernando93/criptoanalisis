import { Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { MarketsService } from '../../../pages/markets/markets.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

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
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private analyticsService: AnalyticsService,
        private authService: NbAuthService,
        private marketsService: MarketsService
    ){}

    ngOnInit() {
        this.getMarket();
    }

    getMarket() {
        this.marketsService.getMarkets().subscribe(
            res => {
                if (!res) {

                } else {
                    this.markets = res;
                }
            },
            error => {
                console.log("no pudo cargar los mercados");
            }
        );
    }
}