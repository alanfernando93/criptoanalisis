import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../coins.service';

@Component({
    selector: 'ngx-list',
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [CoinsService]    
})
export class ListComponent implements OnInit {

    public coins:any;

    constructor(private coinsService: CoinsService){
        
    }

    ngOnInit(){
        /*
        this.coinsService.getCoins().subscribe(data => {
            console.log(data);
            this.coins = data.monedas;
        });
        */
    }
}