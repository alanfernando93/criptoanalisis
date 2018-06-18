import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'ngx-signalAll',
    templateUrl: './signalAll.component.html',
    styleUrls: ['./signalAll.component.scss'],
})
export class SignalAllComponent {

    @Input() listSignal: any;
    @Input() design: any;

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
