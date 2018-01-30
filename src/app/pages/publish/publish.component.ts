import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";

@Component({
    selector: 'ngx-publish',
    styleUrls: ['./publish.component.scss'],
    templateUrl: './publish.component.html',
})

export class PublishComponent implements OnInit {

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
}