import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NewsService } from "../../../services/news.service";

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  buttonsViews = [
    {
      title: "Default Buttons",
      key: "default"
    },
    {
      title: "Outline Buttons",
      key: "outline"
    }
  ];

  @Input() idNew: number = null;

  newsPublish: any = {};
  contenido: String;

  selectedView = this.buttonsViews[0];

  constructor(
    private http: Http, 
    private newsService: NewsService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    if(localStorage.length != 0){
      this.newsService.setToken("?access_token="+localStorage.getItem("auth_app_token"));
      this.newsService.setUserId(localStorage.getItem("userId"));
    }
    if(this.idNew != null){
      this.newsService.getById(this.idNew).then(resp=>{
        this.newsPublish = resp;
        this.contenido = this.newsPublish.contenido;
      });
    }
  }

  keyupHandlerFunction(event) {
    this.contenido = event;
  }

  onSave() {
    this.newsPublish.contenido = this.contenido;
    this.newsService.insertNews(this.newsPublish).then(resp => {
      this.router.navigate(['/']);
    });
  }
}
