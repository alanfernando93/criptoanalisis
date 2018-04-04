import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { AdvisoriesService } from '../advisories.service';


@Component({
  selector: 'ngx-instruccion',
  templateUrl: './instruccion.component.html',
  styleUrls: ['./instruccion.component.scss']
})
export class InstruccionComponent implements OnInit {

  advisory: any;
  id: any;

  constructor(private http: Http, private route: ActivatedRoute, private advisoriesService: AdvisoriesService) {

  }

  ngOnInit() {
    this.getAdvisoryinstruccionById()
  }

  getAdvisoryinstruccionById() {
    this.route.params.forEach((params: Params) => {
      this.id = params['advisoryId'];
      ///let idview =params['idView'];
      this.advisoriesService.getAdvisoriesIntruccion(this.id).subscribe((advisories) => {
        this.advisory = advisories;
      });
    });
  }
}
