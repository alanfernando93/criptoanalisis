import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";

import { environment } from '../../../environments/environment'

@Component({
    selector: 'ngx-publish',
    styleUrls: ['./publish.component.scss'],
    templateUrl: './publish.component.html',
})

export class PublishComponent implements OnInit {
    select:Number = parseInt(environment.selectTab);
    idNew:String;

    constructor(        
        private router: Router,
        private route: ActivatedRoute,
    ) {        
        this.route.params.subscribe((param) => {
            this.idNew = param['idNew'];
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.select = 1
        localStorage.removeItem('select')
    }

    Select($event){
        localStorage.setItem('select',$event.nextId)
    }
}