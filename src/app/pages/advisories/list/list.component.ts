import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    constructor(
        private http:Http,
        private route: ActivatedRoute,
        
    ){
        
    }

    ngOnInit(){
        
    }
}