import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";

import { environment } from '../../../environments/environment'
import { Session } from '../../@core/data/session';

@Component({
    selector: 'ngx-publish',
    styleUrls: ['./publish.component.scss'],
    templateUrl: './publish.component.html',
})

export class PublishComponent implements OnInit {
    select:Number = parseInt(Session.getStorage('select'));
    idNews:String;

    constructor(        
        private router: Router,
        private route: ActivatedRoute
    ) {        
        this.route.params.subscribe((param) => {
            this.idNews = param['idNews'];
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.select = 1
        Session.removeStorage('select');
    }

    Select($event){
        Session.setStorage('select',$event.nextId)
    }
}