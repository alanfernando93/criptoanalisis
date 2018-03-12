import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { NewsService } from "../../../services/news.service";
import { CoinsService } from "../../../services/coins.service";
import { environment } from "../../../../environments/environment"; 

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;

  closeResult: string;

  newsPublish: any = {};
  coins: any = [];
  contenido;
  conjePrecio;
  conjeMoneda;
  titulo;
  usuarioId = environment.userId;

  selectedView = {
    name: "Seleccione Moneda"
  };

  constructor(
    private modalService: NgbModal,
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

  keyupHandlerFunction(event,opc) {
    switch(opc){
      case 'C':this.contenido = event;break;
      case 'CP': this.conjePrecio = event;break;
      case 'CM': this.conjeMoneda = event;break;
    }
  }

  onSave() {
    this.newsPublish.contenido = this.contenido;
    this.newsPublish.titulo = this.titulo;
    this.newsPublish.tipo_moneda = this.selectedView;
    this.newsPublish.conj_moneda = this.conjeMoneda;
    this.newsPublish.conj_precio = this.conjePrecio;
    this.newsPublish.usuarioId = this.usuarioId;
    this.newsService.insertNews(this.newsPublish).then(resp => {
      this.router.navigate(["/"]);
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return `with: ${reason}`;
      }
  }
}
