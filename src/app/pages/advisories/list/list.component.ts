import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AdvisoriesService } from '../advisories.service';



@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    advisories: any;
    constructor(
        private http:Http,
        private AdvisoriesService: AdvisoriesService,
        
    ){
        
    }

    ngOnInit(){
        this.getAdvisories()
    }
    getAdvisories(){
        this.AdvisoriesService.getAdvisories().subscribe(data => {
          this.advisories = data;
        });
      }
}