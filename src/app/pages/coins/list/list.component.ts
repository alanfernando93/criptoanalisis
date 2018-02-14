import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CoinsService } from '../coins.service';

@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [CoinsService]
})
export class ListComponent implements OnInit {
    
    public coins: Array<Object>;

    constructor(
        private http: Http,
        private coinsService: CoinsService){

    }

    ngOnInit(){
        this.coinsService.getCoin().subscribe(
            res => {
                if(!res.coins){

                }else{
                    this.coins = res.coins;
                }
            },
            error => {
                console.log(<any>error);
            }
        )  
    };
}