import { Component, Input } from '@angular/core';
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

    constructor(){
        moment.locale('es');
    }
}