import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { NewsService } from "../../../services/news.service";
import { CoinsService } from "../../../services/coins.service";

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;

  newsPublish: any = {};
  coins: any = [];
  contenido;

  selectedView = {
    name: "Seleccione Moneda"
  };

  constructor(
    private http: Http,
    private newsService: NewsService,
    private coinsService: CoinsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.length != 0) {
      this.newsService.setToken(
        "?access_token=" + localStorage.getItem("auth_app_token")
      );
      this.newsService.setUserId(localStorage.getItem("userId"));
      this.coinsService.setToken(
        "?access_token=" + localStorage.getItem("auth_app_token")
      );
      this.coinsService.setUserId(localStorage.getItem("userId"));
    }
    if (this.idNew != null) {
      this.newsService.getById(this.idNew).then(resp => {
        this.newsPublish = resp;
        this.contenido = this.newsPublish.contenido;
      });
    }
    this.coinsService.getAll().then(resp => {
      this.coins = JSON.parse(resp["_body"]);
    });
  }

  keyupHandlerFunction(event) {
    this.contenido = event;
  }

  onSave() {
    this.newsPublish.contenido = this.contenido;
    this.newsService.insertNews(this.newsPublish).then(resp => {
      this.router.navigate(["/"]);
    });
  }
}
