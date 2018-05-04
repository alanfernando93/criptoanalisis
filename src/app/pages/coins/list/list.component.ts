import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../coins.service';

@Component({
    selector: 'ngx-list',
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [CoinsService]    
})
export class ListComponent implements OnInit {

    coins:any;

    constructor(private coinsService: CoinsService){
        
    }

    ngOnInit(){
    }

}