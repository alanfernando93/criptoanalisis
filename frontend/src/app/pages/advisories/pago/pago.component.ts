import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvisoriesService } from '../advisories.service';

@Component({
  selector: 'ngx-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent implements OnInit {

  advisory: any;
  id: number;

  constructor(private http: Http, private route: ActivatedRoute, private advisoriesService: AdvisoriesService) {

  }

  ngOnInit() {
    this.getAdvisorypagoById()
  }

  getAdvisorypagoById() {
    this.route.params.forEach((params: Params) => {
      this.id = params['advisoryId'];
      this.advisoriesService.getAdvisoriesPago(this.id).subscribe((advisories) => {
        this.advisory = advisories[this.id - 1];
      });
    });
  }
}
