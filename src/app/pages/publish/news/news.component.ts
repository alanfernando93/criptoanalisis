import { Component, OnInit } from "@angular/core";
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

  newsPublish:any = {};
  contenido: String;

  selectedView = this.buttonsViews[0];

  constructor(private http: Http, private newsService: NewsService) {}

  ngOnInit() {
    // this.publish = {
    // 	titulo:"",
    // 	contenido:"",
    // };
  }

  keyupHandlerFunction(event) {
    this.contenido = event;
  }

  onSave() {
	this.newsPublish.contenido = this.contenido;
	console.log(this.newsPublish);
    this.newsService.insertNews(this.newsPublish).then(resp => {
      console.log(resp);
    });
  }
}
