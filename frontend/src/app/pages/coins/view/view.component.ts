import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../coins.service';

@Component({
    selector: 'ngx-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    providers: [CoinsService],
})
export class ViewComponent implements OnInit {

    coins: any;

    constructor(private coinsService: CoinsService){

    }

    ngOnInit(){
    }
}
