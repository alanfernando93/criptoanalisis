import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `]
})
export class ListComponent {

  news:any;

  constructor(private http: Http) {
    http.request('http://192.168.1.8:3000/news').subscribe(
      (resp:Response)=>{
        this.news = JSON.parse(resp['_body']);
        console.log(this.news);
      }
    )
  }

}
