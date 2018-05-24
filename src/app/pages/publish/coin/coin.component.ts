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

@Component({
  selector: 'ngx-publish-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>

  closeResult: string;

  coins: any = []
  markets: any = []
  titles: any = [];
  coin: any = {};
  newsCoins: any = {};
  market: any;

  form: any;
  forms: any = {};

  constructor(
    private modalService: NgbModal,
    private coinsService: CoinsService,
    private marketService: MarketsService,
    private toastService: ToasterService,
  ) { }

  ngOnInit() {
    this.coinsService.getCoinsName().subscribe(data => this.coins = data.monedas)
    this.marketService.getMarkets().subscribe(data => data.forEach(element => this.markets.push(element.nombre)))
    this.coinsService.getTitle().subscribe(data => {
      let subs = []
      data.forEach(element => {
        if (!isNumber(element.correspondencia)) {
          element.subtitles = []
          element.isCollapsed = true
          this.titles.push(element)
        } else
          subs.push(element)
      });
      this.titles.forEach((element, index) => {
        subs.forEach(data => {
          if (element.id === data.correspondencia) {
            delete data.correspondencia
            element.subtitles.push(data)
          }
        })
      });
    })
  }

  open(enlace, id, nombre) {
    let div, divModal: any, modalTitle: any;
    this.coinsService.getTextForm(enlace.toLowerCase()).subscribe(data => {
      div = document.getElementById('body');
      div.innerHTML = data['_body'];
      this.form = document.getElementById('form');
      this.form.setAttribute('class', enlace + " " + id + " " + nombre);
      if (this.forms[enlace]) {
        if (this.forms[enlace]["id"] !== undefined) {
          divModal = document.getElementsByClassName('modal-footer')[0];
          modalTitle = document.getElementsByClassName("modal-title")[0]
          divModal.firstElementChild.innerText = "Modificar";
          modalTitle.innerHTML = "Editar " + nombre;
        }
        length = this.form.length;
        for (let i = 0; i < length; i++) {
          if (this.form[i].type === 'checkbox' || this.form[i].type === 'radio')
            this.form[i].checked = this.forms[enlace][this.form[i].id]
          else
            this.form[i].value = this.forms[enlace][this.form[i].name]
        }
      }
    });
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
      if (data[i].type === 'checkbox' || this.form[i].type === 'radio') {
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
    length = this.form.length;
    for (let i = 0; i < length; i++) {
      if (this.form[i].type === 'checkbox' || this.form[i].type === 'radio')
        this.forms[enlace][this.form[i].id] = this.form[i].checked;
      else
        this.forms[enlace][this.form[i].name] = this.form[i].value;
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

  formatter = (x: { name: string }) => x.name;

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
