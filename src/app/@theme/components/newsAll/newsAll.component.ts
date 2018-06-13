import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'ngx-newsAll',
    templateUrl: './newsAll.component.html',
    styleUrls: ['./newsAll.component.scss']
})
export class newsAllComponent {

    @Input() listNews: any;
    @Input() design: any;
    @Input() precision: any;

    pagado: number = 50;

    constructor(
      private router: Router
    ){
        moment.locale('es');
    }

    routerLink(url, params?){
      this.router.navigate([url, params]);
    }
}