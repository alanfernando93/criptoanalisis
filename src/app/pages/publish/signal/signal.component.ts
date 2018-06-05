import { Component, OnInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from "@angular/router";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { SignalsService } from '../../signals/signals.service';
import { CoinsService } from "../../coins/coins.service";

import { configCrud, typeCoinByDefault, typeOfOffer, TipoSalida } from '../../../common/ConfigSettings';
import { showToast } from '../../../common/functions'
import { DropboxCripto } from "../../../common/dropbox";

import 'style-loader!angular2-toaster/toaster.css';
import { CryptoCompareService } from '../../../@core/data/cryptocompare.service';

@Component({
  selector: 'ngx-publish-signal',
  styleUrls: ['./signal.component.scss'],
  templateUrl: 'signal.component.html'
})

export class SignalComponent implements OnInit, OnDestroy {
  @Input() idSignal: String = null;
  data: string;

  myFile: File;
  puntEntr = 1;
  tipSal = 1;
  stopLoss = 1;

  signal: any = {};

  contenido1: String;
  contenido2: String;

  moneda1: String = "Moneda1"
  moneda2: String = "Moneda2"
  exchange: String = "Exchange"

  posEntrada: any = [];
  posSalida: any = [];
  posLoss: any = [];
  coins: any = [];

  types = typeCoinByDefault;

  selectTipoSalida = {
    title: 'Take Profit',
    key: true,
  }

  TipoSalida = TipoSalida;

  tipoSignal = {
    title: 'Accion',
    key: true,
  }

  tipos = typeOfOffer;

  content = `I'm cool toaster!`;
  type = 'default';

  currentPrice;
  style: any = {};

  constructor(
    private modalService: NgbModal,
    private renderer: Renderer2,
    private signalsService: SignalsService,
    private coinsService: CoinsService,
    private router: Router,
    private toasterService: ToasterService,
    private dropbox: DropboxCripto,
    private bitcoin: CryptoCompareService
  ) { }

  ngOnInit() {
    if (this.idSignal != null) {
      // this.newsService.getById(this.idNew).then(resp => {
      //   this.newsPublish = resp;
      //   this.contenido = this.newsPublish.contenido;
      // });
    }
    this.coinsService.getAll().subscribe(resp => {
      this.coins = resp;
    });
  }

  refreshEditor1() {
    return new Promise(resolve => {
      setTimeout(() => {
        tinymce.editors[0].uploadImages(() => {
          this.signal.AnalisisFundamental = tinymce.editors[0].getContent()
          resolve("get edito 1");
        })
      }, 2000);
    });
  }
  refreshEditor2() {
    return new Promise(resolve => {
      setTimeout(() => {
        tinymce.editors[1].uploadImages(() => {
          this.signal.AnalisisTecnico = tinymce.editors[1].getContent()
          resolve('get edito 2');
        })
      }, 2000);
    });
  }

  async onSave() {
    var uno = await this.refreshEditor1();
    var dos = await this.refreshEditor2();
    this.signal.visible = true;
    this.signal.tipo = this.tipoSignal.key;
    this.signal.count = "";
    this.signal.moneda1 = this.moneda1;
    this.signal.moneda2 = this.moneda2;
    let positions = (this.posEntrada.concat(this.posSalida).concat(this.posLoss));
    this.signalsService.add(this.signal).subscribe(resp => {
      this.dropbox.imageUploadDropbox(this.myFile, this.signalsService.getUserId(), 'signals', 'perfil-' + resp.id).then(resp => {
        this.type = 'success'
        this.content = configCrud.message.success + ' señales';
        showToast(this.toasterService, this.type, this.content);
        this.router.navigate(["/pages/signals/list"]);
      });
      let id = resp.id;
      positions.forEach((value, key) => {
        positions[key].signalId = id
        this.signalsService.setPosition(positions[key]).subscribe(respo => {
        })
        this.type = 'success'
        this.content = configCrud.message.success;
      }, erro => {
        this.type = 'error'
        this.content = configCrud.message.error + " los puntos";
      });
      showToast(this.toasterService, this.type, this.content);
    }, error => {
      console.error(error);
      this.type = 'error'
      this.content = configCrud.message.error + ' señales';
      showToast(this.toasterService, this.type, this.content);
    });
  }

  selected(coin, data) {
    if (coin == 'm1')
      this.moneda1 = data;
    else
      this.moneda2 = data;

    let div1 = document.getElementById('puntEntr')
    let div2 = document.getElementById('stopLoss')
    let div3 = document.getElementById('tipSal')
    this.clearForm(div1);
    this.clearForm(div2);
    this.clearForm(div3);
    this.posEntrada = [];
    this.posSalida = [];
    this.posLoss = [];
    this.puntEntr = 1;
    this.tipSal = 1;
    this.stopLoss = 1;
    if (this.moneda1 != "Moneda1" && this.moneda2 != "Moneda2") {
      let money = this.coins.find(element => element.name == this.moneda1)
      this.bitcoin.disconnect()

      this.bitcoin.connect();
      this.bitcoin.sendBTC(money.symbol, this.moneda2);
      this.bitcoin.getCurrentPrice().subscribe(price => {
        if (price != undefined) {
          this.style.background = 'red';
          this.style.color = "white";
          this.currentPrice = parseFloat(<string>price).toFixed(2);
          setTimeout(() => {
            this.style.background = "white";
            this.style.color = "black";
          }, 700)
        }
      });
    }
  }

  clearForm(div: HTMLElement) {
    let nodes = div.children;
    if (nodes.length > 2) {
      for (let i = 1; i < nodes.length - 1; i++) {
        div.removeChild(nodes[i]);
      }
    }
  }

  keyPress($event) {    
    let parent = $event.target.parentNode;
    let data1 = $event.target;
    if (this.moneda1 == "Moneda1" || this.moneda2 == "Moneda2") {
      data1.value = "";
      showToast(this.toasterService, 'warning', 'Debe Seleccionar primero las monedas');      
      return;
    }
    let span = document.createElement('span');
    span.setAttribute('class','form-text error');
    span.setAttribute('role','alert');
    span.setAttribute('style','color: #721c24;background-color: #f8d7da;');
    let porcPrice: any = parseFloat((this.currentPrice * 0.3).toString()).toFixed(2);
    let admittedPriceMen = this.currentPrice - porcPrice;
    let admittedProceMay = this.currentPrice + porcPrice;

    if (admittedPriceMen >= data1.value) {
      span.innerHTML = "El valor ingresado es muy bajo"
      parent.after(span);
      setTimeout(() => {
        span.remove();
      }, 1000);
      return;
    }
    if(data1.value >= admittedProceMay) {
      span.innerHTML = "El valor ingresado es muy alto"
      parent.after(span);
      setTimeout(() => {
        span.remove();
      }, 1000);
      return;
    }
  }

  onClickPuntos($events, option, ptn) {
    const container = $events.target.closest(`#${option}`);
    let data1 = $events.target.closest(`#${option}-data`).children[1];
    let data2 = $events.target.closest(`#${option}-data`).children[2];

    var data = {
      valor: data1.value,
      // porcentajeCapital: data2.value,
      puntoId: 0
    };
    if (!data1.value /*|| !data2.value*/) {
      showToast(this.toasterService, 'info', '!!!Campo vacio');
      return
    }
    switch (option) {
      case 'puntEntr': data.puntoId = 3;
        this.posEntrada.push(data);
        break;
      case 'tipSal': data.puntoId = 2;
        this.posSalida.push(data);
        break;
      case 'stopLoss': data.puntoId = 1;
        this.posLoss.push(data);
        break;
    }
    const _body = this.renderer.createElement('div');

    this.renderer.addClass(_body, "row");

    const content = this.renderer.createElement('div');
    this.renderer.addClass(content, "contenedor");
    this.renderer.addClass(content, "input-group");
    // this.renderer.setProperty(content, "id", option + "-data");

    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, "input-group-addon");
    this.renderer.appendChild(span, this.renderer.createText('Punto ' + ptn));

    const d1 = this.renderer.createElement('input');
    this.renderer.addClass(d1, "form-control");
    this.renderer.setProperty(d1, 'aria-label', "Amount (to the nearest dollar)");
    this.renderer.setProperty(d1, 'type', "text");
    this.renderer.setProperty(d1, 'value', data1.value + " " + this.moneda2);
    this.renderer.setAttribute(d1, 'disabled', 'true');
    this.renderer.setProperty(d1, "id", ptn - 1);
    this.renderer.listen(d1, 'change', $events => {
      var input = $events.target;
      switch (option) {
        case 'puntEntr': this.posEntrada[input.id].valor = input.value.split(' ')[0];
          break;
        case 'tipSal': this.posSalida[input.id].valor = input.value.split(' ')[0];
          break;
        case 'stopLoss': this.posLoss[input.id].valor = input.value.split(' ')[0];
          break;
      }
      input.disabled = true;
    });

    // const d2 = this.renderer.createElement('input');
    // this.renderer.addClass(d2, "form-control");
    // this.renderer.setProperty(d2, 'aria-label', "Amount (to the nearest dollar)");
    // this.renderer.setProperty(d2, 'type', "text");
    // this.renderer.setProperty(d2, 'value', data2.value + " %");
    // this.renderer.setAttribute(d2, 'disabled', 'true');
    // this.renderer.setProperty(d2, "id", ptn - 1);
    // this.renderer.listen(d2, 'change', $events => {
    //   console.log(this.posEntrada)
    //   var input = $events.target;
    //   switch (option) {
    //     case 'puntEntr': this.posEntrada[input.id].porcentajeCapital = input.value.split(' ')[0];
    //       break;
    //     case 'tipSal': this.posSalida[input.id].porcentajeCapital = input.value.split(' ')[0];
    //       break;
    //     case 'stopLoss': this.posLoss[input.id].porcentajeCapital = input.value.split(' ')[0];
    //       break;
    //   }
    //   input.disabled = true;
    // });

    const edit = this.renderer.createElement('span');
    this.renderer.addClass(edit, "input-group-btn");
    const bedit = this.renderer.createElement('button');
    this.renderer.addClass(bedit, "btn");
    this.renderer.addClass(bedit, "btn-secondary");
    this.renderer.setProperty(bedit, 'type', 'button');
    this.renderer.setProperty(bedit, 'id', 'false');
    this.renderer.listen(bedit, 'click', ($event) => {
      const oldBody = $event.target.closest('.row').children[0];
      const input1 = oldBody.children[1];
      const input2 = oldBody.children[2];
      this.renderer.removeAttribute(input1, 'disabled');
      this.renderer.removeAttribute(input2, 'disabled');
    });

    this.renderer.appendChild(edit, bedit);

    const iedit = this.renderer.createElement('i');
    this.renderer.addClass(iedit, "fa");
    this.renderer.addClass(iedit, "fa-pencil");
    this.renderer.appendChild(bedit, iedit);

    const remove = this.renderer.createElement('span');
    this.renderer.addClass(remove, "input-group-btn");
    this.renderer.addClass(remove, "rigth");
    const bremove = this.renderer.createElement('button');
    this.renderer.addClass(bremove, "btn");
    this.renderer.addClass(bremove, "btn-secondary");
    this.renderer.setProperty(bremove, 'type', 'button');
    this.renderer.setProperty(bremove, "id", ptn - 1);
    this.renderer.listen(bremove, 'click', ($event) => {
      var id = $event.target.id;
      const oldBody = $event.target.closest('.row');
      const content = $event.target.closest('#' + option)
      content.removeChild(oldBody);
      // this.renderer.removeChild(content, oldBody);
      this.refresh(option, id);
    });
    this.renderer.appendChild(remove, bremove);
    const iremove = this.renderer.createElement('i');
    this.renderer.addClass(iremove, "fa");
    this.renderer.addClass(iremove, "fa-times-circle");
    this.renderer.appendChild(bremove, iremove);

    this.renderer.appendChild(content, span);
    this.renderer.appendChild(content, d1);
    // this.renderer.appendChild(content, d2);
    this.renderer.appendChild(content, edit);
    this.renderer.appendChild(content, remove);

    this.renderer.appendChild(_body, content);

    let lenght = container.children.length;
    this.renderer.insertBefore(container, _body, container.children[lenght - 1]);

    data1.value = '';
    // data2.value = '';

    switch (option) {
      case 'puntEntr': this.puntEntr += 1;
        if (this.puntEntr < 4) return;
        break;
      case 'tipSal': this.tipSal += 1;
        if (this.tipSal < 4) return;
        break;
      case 'stopLoss': this.stopLoss += 1;
        if (this.stopLoss < 2) return;
        break;
    }
    $events.target.closest(`#${option}-data`).children[1].disabled = true;
    // $events.target.closest(`#${option}-data`).children[2].disabled = true;
    $events.target.closest(`#${option}-data`).children[2].children[0].disabled = true;
    $events.target.closest(`#${option}-data`).children[3].children[0].disabled = true;
  }

  refresh(opc, id) {
    var node = document.getElementById(opc).children;
    for (let i = 1; i < node.length - 1; i++) {
      var collection = node[i].children[0].children;
      collection[0].innerHTML = 'Punto ' + i;
      for (let ii = 1; ii < collection.length - 2; ii++) {
        collection[ii].id = '' + i;
      };
      collection[4].id = '' + (i - 1);
    }
    switch (opc) {
      case 'puntEntr': this.puntEntr = node.length - 1; this.posEntrada.splice(id, 1); break;
      case 'tipSal': this.tipSal = node.length - 1; this.posSalida.splice(id, 1); break;
      case 'stopLoss': this.stopLoss = node.length - 1; this.posLoss.splice(id, 1); break;
    }

    (<HTMLInputElement>document.getElementById(`${opc}-data`).children[1]).disabled = false;
    // (<HTMLInputElement>document.getElementById(`${opc}-data`).children[2]).disabled = false;
    (<HTMLInputElement>document.getElementById(`${opc}-data`).children[2].children[0]).disabled = false;
    (<HTMLInputElement>document.getElementById(`${opc}-data`).children[3].children[0]).disabled = false;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
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

  ngOnDestroy() {
    this.bitcoin.close().subscribe(msg => {
      console.log(msg);
    })
  }
}
