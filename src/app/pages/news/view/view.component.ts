import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  news: any;
  table: String = "news";
  id: number;
  constructor(private http: Http, private route: ActivatedRoute, private backend: BackendService) {
    this.route.params.subscribe((param) => {
      this.id = param['idNew'];
      console.log(this.id);

      })
       this.http.get('http://localhost:3000/news/'+ this.id).subscribe(
         (resp:Response)=>{
           this.news = JSON.parse(resp['_body']);
           console.log(this.news);
         }
       )
    }
}
