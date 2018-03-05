import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { NewsService } from "../../../services/news.service";
import { CoinsService } from "../../../services/coins.service";

@Component({
    selector: 'ngx-publish-signal',
    styleUrls: ['./signal.component.scss'],
    templateUrl: 'signal.component.html'
})

export class SignalComponent implements OnInit {
    @Input() idSignal: String = null;

    @ViewChild('container') container : ElementRef;
    @ViewChild('data1') data1 : ElementRef;
    @ViewChild('data2') data2 : ElementRef;
    punto = 1;

    coins: any = [];

    selectedCoin = {
        name: "Moneda"
    };

    selectedType = {
        id: "USD"
    };

    types = [{
        id: 'USD'
      }, {
        id: 'BTC'
      },{
        id: 'ETH'
      }];
    constructor(
        private modalService: NgbModal,
        private renderer: Renderer2,
        private http: Http,
        // private newsService: NewsService,
        private coinsService: CoinsService,
        private router: Router
    ) { }

    ngOnInit() { 
        if (localStorage.length != 0) {
            // this.newsService.setToken(
            //   "?access_token=" + localStorage.getItem("auth_app_token")
            // );
            // this.newsService.setUserId(localStorage.getItem("userId"));
            this.coinsService.setToken(
              "?access_token=" + localStorage.getItem("auth_app_token")
            );
            this.coinsService.setUserId(localStorage.getItem("userId"));
          }
          if (this.idSignal != null) {
            // this.newsService.getById(this.idNew).then(resp => {
            //   this.newsPublish = resp;
            //   this.contenido = this.newsPublish.contenido;
            // });
          }
          this.coinsService.getAll().then(resp => {
            this.coins = JSON.parse(resp["_body"]);
          });
    }

    onSave() {

    }

    keyupHandlerFunction($event) {

    }

    onClickPuntos() {
        const _body = this.renderer.createElement('div');
        this.renderer.addClass(_body,"row");

        const content = this.renderer.createElement('div');
        this.renderer.addClass(content,"contenedor");
        this.renderer.addClass(content,"input-group")
        
        const span = this.renderer.createElement('span');
        this.renderer.addClass(span,"input-group-addon");

        this.renderer.appendChild(span,this.renderer.createText('Punto ' + this.punto));

        const d1 = this.renderer.createElement('input');
        this.renderer.addClass(d1,"form-control");
        this.renderer.setProperty(d1, 'aria-label', "Amount (to the nearest dollar)");
        this.renderer.setProperty(d1, 'type', "text");
        this.renderer.setProperty(d1, 'value', this.data1.nativeElement.value);
        
        const d2 = this.renderer.createElement('input');
        this.renderer.addClass(d2,"form-control");
        this.renderer.setProperty(d2, 'aria-label', "Amount (to the nearest dollar)");
        this.renderer.setProperty(d2, 'type', "text");
        this.renderer.setProperty(d2, 'value', this.data2.nativeElement.value);
        
        const edit = this.renderer.createElement('span');
        this.renderer.addClass(edit,"input-group-btn");
        const bedit = this.renderer.createElement('button');
        this.renderer.addClass(bedit,"btn btn-secondary");
        this.renderer.setProperty(bedit,'type','button');
        this.renderer.appendChild(edit,bedit);
        const iedit = this.renderer.createElement('i');
        this.renderer.addClass(iedit,"fa");
        this.renderer.addClass(iedit,"fa-pencil");
        this.renderer.appendChild(bedit,iedit);

        const remove = this.renderer.createElement('span');
        this.renderer.addClass(remove,"input-group-btn");
        const iremove = this.renderer.createElement('i');
        this.renderer.addClass(iremove,"fa");
        this.renderer.addClass(iremove,"fa-times-circle");
        this.renderer.appendChild(remove,iremove);

        this.renderer.appendChild(content,span);
        this.renderer.appendChild(content,d1);
        this.renderer.appendChild(content,d2);
        this.renderer.appendChild(content,edit);
        this.renderer.appendChild(content,remove);

        this.renderer.appendChild(_body,content);
        
        let lenght = this.container.nativeElement.children.length;
        this.renderer.insertBefore(this.container.nativeElement,_body,this.container.nativeElement.children[lenght-1]);
        
        this.punto += 1;
    }
}