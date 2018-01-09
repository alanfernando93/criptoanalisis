import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `]
})
export class ViewComponent {

  news:any;
  id:number;
    constructor(private http: Http, private route:ActivatedRoute) {
      this.route.params.subscribe((param)=>{
        this.id = param['idNew'];
        console.log(this.id);

      })
       this.http.get('http://192.168.1.8:3000/news/'+ this.id).subscribe(
         (resp:Response)=>{
           this.news = JSON.parse(resp['_body']);
           console.log(this.news);
         }
       )
    }
}
