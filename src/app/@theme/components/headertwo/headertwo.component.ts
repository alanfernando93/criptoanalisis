import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params} from '@angular/router';

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
    marketId:number;
    marketSeleccionado;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private analyticsService: AnalyticsService,
        private marketService: MarketService,
        private authService: NbAuthService,
        private router: Router,
        private ruta:ActivatedRoute
    ) { }

    ngOnInit() {
        this.ruta.params.subscribe( params =>  {
            this.marketId = params['marketId'];
            this.marketSeleccionado = this.encontrarMarket()
        })        
    }

    getMarket(){
        this.marketService.getMarkets().subscribe(data => {
            this.markets = data;
        });
    }

    filtroPorId(market){
        return market.id = this;
    }

    encontrarMarket(){
        return this.markets.filter(this.filtroPorId, this.marketId)[0];
    }

}