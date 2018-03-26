import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// import { NewsService } from "../../../services/news.service";
import { NewsService } from "../../news/news.service";
// import { CoinsService } from "../../../services/coins.service";
import { CoinsService } from "../../coins/coins.service";
import { environment } from "../../../../environments/environment"; 

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;

  closeResult: string;
  successMessage: string;
  type : String;
  newsPublish: any = {};
  coins: any = [];
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
    if (this.idNew != null) {
      this.newsService.getById(this.idNew).subscribe(resp => {
        this.newsPublish = resp;
      });
    }
    this.coinsService.getAll().subscribe(resp => {
      this.coins = resp;
    });
  }

  keyupHandlerFunction(event,opc) {
    switch(opc){
      case 'C':this.newsPublish.contenido = event;break;
      case 'CP': this.newsPublish.conj_precio = event;break;
      case 'CM': this.newsPublish.conj_moneda = event;break;
    }
  }
/*
  onSave() {
    this.newsPublish.tipo_moneda = this.selectedView.name;
    this.newsPublish.usuarioId = this.usuarioId;
    console.log(this.newsPublish);
    this.newsService.insert(this.newsPublish).subscribe(resp => {
      this.type = "success";
      this.successMessage = "Se guardo correctamente!!!"
      setTimeout(() => {
        this.successMessage = null, 7000; 
        this.router.navigate(["/"]);
      });
    },err => {
      this.type = "warning";
      this.successMessage = "Se produjo un error!!!"
      setTimeout(() => this.successMessage = null, 7000);
    });    
  }
*/
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
