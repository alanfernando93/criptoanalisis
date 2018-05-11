import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'ngx-userPopup',
    templateUrl: './userPopup.component.html',
    styleUrls: ['./userPopup.component.scss']
})
export class userPopupComponent implements OnInit {

    @Input() ImageUser: any;
    @Input() Username: any;
    @Input() precisionUser: any;
    @Input() famaUserfirst: any;
    @Input() famaValor: any;
    @Input() famaSymbol: any;
    @Input() commentUser: any;

    constructor(){

    }

    ngOnInit(){

    }
}