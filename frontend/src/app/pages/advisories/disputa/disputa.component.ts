import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvisoriesService } from '../advisories.service';

@Component({
  selector: 'ngx-disputa',
  templateUrl: './disputa.component.html',
  styleUrls: ['./disputa.component.scss'],
})
export class DisputaComponent implements OnInit {

  advisory: any;
  id;


  constructor(private route: ActivatedRoute, private advisoriesService: AdvisoriesService) {

  }

  ngOnInit() {
    this.getAdvisorydisputaById()
  }

  getAdvisorydisputaById() {
    this.route.params.forEach((params: Params) => {
      this.id = params['advisoryId'];
      this.advisoriesService.getAdvisoriesDisputa(this.id).subscribe((advisories) => {
        this.advisory = advisories;
      });
    });
  }
}
