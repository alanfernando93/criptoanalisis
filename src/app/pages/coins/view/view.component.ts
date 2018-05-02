import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { CoinsService } from '../coins.service';

@Component({
    selector: 'ngx-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    providers: [CoinsService]
})
export class ViewComponent implements OnInit {
    
    coins:any;

    constructor(private coinsService: CoinsService){
        
    }

    ngOnInit(){
        //this.getCoins();
    }
    /*

    getCoins() {
        this.coinsService.getAll().subscribe(data => {
            data ? this.coins = data : {};
        });
    }
    */
}