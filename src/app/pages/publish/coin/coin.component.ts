import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { CoinsService } from '../../coins/coins.service'
import { MarketsService } from '../../markets/markets.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { showToast } from '../../../common/functions';
import { ToasterService } from 'angular2-toaster';
import { isString, isNull } from 'util';
import { filter } from 'rxjs/operators/filter';
import { forEach } from '@angular/router/src/utils/collection';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-publish-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>

  isCoin: boolean = false;

  coins: any = []
  coin: any = {};
  markets: any = []
  market: any;

  titles: any = [];
  newsCoins: any = {};

  formHtml: any;
  forms: any = {};

  constructor(
    private modalService: NgbModal,
    private coinsService: CoinsService,
    private marketService: MarketsService,
    private toastService: ToasterService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.coinsService.getCoinsName().subscribe(data => this.coins = data.monedas)
    this.marketService.getMarkets().subscribe(data => data.forEach(element => this.markets.push(element.nombre)))
    this.coinsService.getTitle().subscribe(data => {
      this.titles = data.filter(item => item.correspondencia == null);
      this.titles.forEach(element => {
        element.subtitles = data.filter(obj => {
          if (obj.correspondencia == element.id) {
            delete obj.correspondencia;
            return obj;
          }
        });
        element.isCollapsed = true
      });
    })
  }

  keyUp(event){
    if(event.target.value == ""){
      Array.from(document.getElementsByClassName('sub')).forEach(element => element.setAttribute('class', 'rounded sub btn btn-secondary'));
      this.isCoin = false;
      this.coin = {};
    }
  }

  open(enlace, id, nombre) {    
    if (!this.isCoin) {
      showToast(this.toastService, 'info', 'Seleccione una moneda');
      Array.from(document.getElementsByClassName('sub')).forEach(element => element.setAttribute('disabled', 'true'));
      setTimeout(() => {
        Array.from(document.getElementsByClassName('sub')).forEach(element => element.removeAttribute('disabled'));
        this.toastService.clear();
      }, 1000);
      return;
    }
    let div, divModal: any, modalTitle: any;
    this.coinsService.getTextForm(enlace.toLowerCase()).subscribe(data => {
      div = document.getElementById('body');
      div.innerHTML = data['_body'];
      this.formHtml = document.getElementById('form');
      this.formHtml.setAttribute('class', enlace + " " + id + " " + nombre);
      modalTitle = document.getElementsByClassName("modal-title")[0]
      modalTitle.innerHTML = nombre;
      if (this.forms[enlace]) {
        if (this.forms[enlace]["id"] !== undefined) {
          divModal = document.getElementsByClassName('modal-footer')[0];
          modalTitle = document.getElementsByClassName("modal-title")[0]
          divModal.firstElementChild.innerText = "Modificar";
          modalTitle.innerHTML = "Editar " + nombre;
        }
        length = this.formHtml.length;
        for (let item of this.formHtml) {
          if (item.type === 'checkbox' || item.type === 'radio')
            item.checked = this.forms[enlace][item.id]
          else
            item.value = this.forms[enlace][item.name]
        }
      }
    });
    this.modalService.open(this.content).result.then((result) => {
    }, (reason) => {
      this.getParamsForm(enlace);
    });
  }

  submit(callback) {
    let data: any = document.getElementById('form');
    let clas = data.className.split(" ");
    this.newsCoins.tituloId = clas[1];
    this.newsCoins.estado = true;
    this.newsCoins.monedaId = this.coin.id;
    length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i].type === 'checkbox' || this.formHtml[i].type === 'radio') {
        if (data[i].checked) this.newsCoins.calificacion = data[i].value;
      } else
        this.newsCoins.contenido = data[i].value;
    }
    this.coinsService.setCoinContent(this.newsCoins, this.forms[clas[0]] == undefined ? "undefined" : this.forms[clas[0]].id).subscribe(res => {
      let button = document.getElementById(clas[0]);
      button.setAttribute('class', 'rounded sub btn btn-success');

      callback('Close click');
      if (this.forms[clas[0]] == undefined) this.getParamsForm(clas[0])
      this.forms[clas[0]].id = res.id;
      showToast(this.toastService, 'success', clas[2] + " insertada con exito");
    })
  }

  getParamsForm(enlace) {
    if (this.forms[enlace] == undefined) this.forms[enlace] = {};
    length = this.formHtml.length;
    for (let tag of this.formHtml) {
      if (tag.type === 'checkbox' || tag.type === 'radio')
        this.forms[enlace][tag.id] = tag.checked;
      else
        this.forms[enlace][tag.name] = tag.value;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC)
      return 'by pressing ESC';
    else if (reason === ModalDismissReasons.BACKDROP_CLICK)
      return 'by clicking on a backdrop';
    else
      return `with: ${reason}`;
  }

  formatter = (x) => {
    this.isCoin = false;
    if (x.name != undefined) {
      this.isCoin = true;
      this.userService.getCoinContent(x.id).subscribe(data => {
        Array.from(document.getElementsByClassName('sub')).forEach(element => element.setAttribute('class', 'rounded sub btn btn-secondary'));
        this.forms = {};
        data.forEach(element => {
          this.coinsService.getTitleById(element.tituloId).subscribe(title => {
            this.forms[title.enlace] = {};
            this.forms[title.enlace].conclusion = element.contenido;
            this.forms[title.enlace].id = element.id;
            this.forms[title.enlace]["customRadio" + element.calificacion] = true;
            let button = document.getElementById(title.enlace);
            button.setAttribute('class', 'rounded sub btn btn-success');
          })
        });
      })
    }
    return x.name;
  };

  searchCoins = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.coins.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  searchMarkets = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.markets.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
}
