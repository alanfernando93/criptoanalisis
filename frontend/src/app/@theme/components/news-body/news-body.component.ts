import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'ngx-news-body',
    templateUrl: './news-body.component.html',
    styleUrls: ['./news-body.component.scss'],
})
export class NewsBodyComponent {

    @Input() listNews: any;
    @Input() design: any;
    @Input() precision: any;

    pagado: number = 50;

    constructor(
        private router: Router,
    ) {
        moment.locale('es');
    }

    routerLink(url, params?) {
        this.router.navigate([url, params]);
    }
}
