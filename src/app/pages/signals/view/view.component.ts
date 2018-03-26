import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SignalsService } from '../signals.service';


@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  signal: any;
  idSignal: any;
  contentUser: any;
  like: number;
  dislike: number;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private signalsService: SignalsService) {

  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.idSignal = params['signalId'];
    });
    this.getSignalById();
    this.getSignalWithUser();
  }

  getSignalById() {

    this.signalsService.getById(this.idSignal).subscribe(
      signal => {
        signal ? this.signal = signal : '';

      });
  }

  getSignalWithUser() {
    this.signalsService.getUserBySignal(this.idSignal).subscribe(data => {
      this.contentUser = data;
    })
  }

  sendLike() {
    this.signalsService.postLikes(this.idSignal).subscribe(data => {
      this.like = data;
      console.log(this.like);
      this.signal = data;
    });
  }

  sendDislike() {
    this.signalsService.postDislikes(this.idSignal).subscribe(data => {
      this.dislike = data;
      console.log(this.dislike);
      this.signal = data;
    });
  }
}
