import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { AdvisoriesService } from '../advisories.service';


@Component({
  selector: 'ngx-disputa',
  templateUrl: './disputa.component.html',
  styleUrls: ['./disputa.component.scss']
})
export class DisputaComponent implements OnInit {

  advisory:any;

  constructor(private http: Http, private route: ActivatedRoute, private advisoriesService: AdvisoriesService) {
      
  }

    ngOnInit() {
      this.getAdvisoryById()
    }

    getAdvisoryById(){
      this.route.params.forEach((params: Params) => {
        let id = params['advisoryIduser'];
        this.advisoriesService.getAdvisoriesId(id).subscribe((advisories) => {
          this.advisory = advisories;
        });
      });
    }
}
