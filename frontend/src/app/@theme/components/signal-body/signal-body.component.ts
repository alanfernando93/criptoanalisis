import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'ngx-signal-body',
    templateUrl: './signal-body.component.html',
    styleUrls: ['./signal-body.component.scss'],
})
export class SignalBodyComponent {

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
