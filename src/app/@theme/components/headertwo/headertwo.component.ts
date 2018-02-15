import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { CoinsService } from '../../../pages/coins/coins.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
    selector: "ngx-headertwo",
    styleUrls: ["./headertwo.component.scss"],
    templateUrl: "./headertwo.component.html",
    providers: [CoinsService]
})
export class HeaderTwoComponent implements OnInit {
    @Input() position = "normal";

    public coins: any;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private analyticsService: AnalyticsService,
        private coinsService: CoinsService,
        private authService: NbAuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.coinsService.getCoins().subscribe(data => {
            console.log(data);
            this.coins = data.monedas;
        });
    }

}