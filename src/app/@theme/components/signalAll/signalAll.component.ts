import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'ngx-signalAll',
    templateUrl: './signalAll.component.html',
    styleUrls: ['./signalAll.component.scss']
})
export class signalAllComponent {

    @Input() listSignal: any;
    @Input() design: any;

    pagado: number = 50; 

    constructor(){
        moment.locale('es');
    }

}