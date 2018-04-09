import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AdvisoriesService } from '../advisories.service';
import { Session } from '../../../@core/data/session';


@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends Session implements OnInit {
    advisories: any;
    advisoriesbyid: any;
    private userId = this.getUserId();

    constructor(
        
        private http: Http,
        private AdvisoriesService: AdvisoriesService,

    ) {
        super()
    }

    ngOnInit() {
        
        this.getAdvisories()
        this.getadvisoriesbyid();
    }
    getAdvisories() {
        this.AdvisoriesService.getAdvisories().subscribe(data => {
            this.advisories = data;
        });
    }
    getadvisoriesbyid(){
        this.AdvisoriesService.getadvisoriesbyuserid(this.userId).subscribe(data => {
            this.advisoriesbyid = data;
            console.log(this.userId)
        });
    }
}