import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { MarketService } from '../market.service';

@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    id:number;

    constructor(
        private http:Http,
        private route: ActivatedRoute,
        private marketService: MarketService
    ){
        this.route.params.subscribe((param) => {
            this.id = param['marketId'];
            console.log(this.id);
        });
    }

    ngOnInit(){
        
    }
}