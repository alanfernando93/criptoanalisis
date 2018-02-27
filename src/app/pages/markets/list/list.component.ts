import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { MarketsService } from '../markets.service';

@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    constructor(
        private http: Http,
        private route: ActivatedRoute,
    ){
        
    }

    ngOnInit(){
        
    }
}