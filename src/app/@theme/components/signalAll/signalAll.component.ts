import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-signalAll',
    templateUrl: './signalAll.component.html',
    styleUrls: ['./signalAll.component.scss']
})
export class signalAllComponent {

    @Input() listSignal: any;
    @Input() design: any;

    constructor(){

    }

}