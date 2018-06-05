import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MarketsService } from '../../../pages/markets/markets.service';
import { TranslateService } from '@ngx-translate/core';

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
        private marketsService: MarketsService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.translate.addLangs(['en', 'es']);
        this.translate.setDefaultLang('es');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
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