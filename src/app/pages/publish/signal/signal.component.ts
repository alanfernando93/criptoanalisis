import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";
 
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { SignalsService } from '../../signals/signals.service';
import { CoinsService } from "../../coins/coins.service";

import { configCrud, typeCoinByDefault, typeOfOffer } from '../../../common/ConfigSettings';
import { showToast } from '../../../common/functions'
import { DropboxCripto } from "../../../common/dropbox";
import { BitFinexCrypto } from '../../../common/bitfinex';

// import { BFX } from "bitfinex-api-node";

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-publish-signal',
  styleUrls: ['./signal.component.scss'],
  templateUrl: 'signal.component.html'
})

export class SignalComponent implements OnInit {
  @Input() idSignal: String = null;

  myFile: File;
  pntEnt = 1;
  tpSal = 1;
  stopLoss = 1;

  signal: any = {};

  contenido1: String;
  contenido2: String;

  moneda1: String = "Moneda"
  moneda2: String = "Moneda"

  posEntrada: any = [];
  posSalida: any = [];
  posLoss: any = [];
  coins: any = [];

  types = typeCoinByDefault;

  selectTipoSalida = {
    title: 'Take Profit',
    key: true,
  }

  TipoSalida = [{
    title: 'Take Profit',
    key: true,
  }, {
    title: 'Stop Profit',
    key: false,
  }];

  tipoSignal = {
    title: 'Accion',
    key: true,
  }

  tipos = typeOfOffer;

  content = `I'm cool toaster!`;
  type = 'default';

  ws;
  constructor(
    private modalService: NgbModal,
    private renderer: Renderer2,
    private http: Http,
    private signalsService: SignalsService,
    private coinsService: CoinsService,
    private router: Router,
    private toasterService: ToasterService,
    private dropbox: DropboxCripto,
    private bitcoin: BitFinexCrypto
  ) {  }

  ngOnInit() {
    // const bfx = new BFX({
    //   apiKey: 'wWlsgs7qh3wVkpSQVKmPNsAJnirCPKDumxr4zuVc50m',
    //   apiSecret: 'MeO8iFykzRqBCqH1eagQCa3mfCBFxhds7ZKIRSJ7PLF',

    //   ws: {
    //     autoReconnect: true,
    //     seqAudit: true,
    //     packetWDDelay: 10 * 1000
    //   }
    // });
    // const ws = new WebSocket('wss://api.bitfinex.com/ws');
    //this.bitcoin.sendBTC("");
    this.bitcoin.getTrades().subscribe(res =>{
      console.log(res)
    })
    this.bitcoin.sendBTC("");
    this.bitcoin.get();
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
      this.type = 'error'
      this.content = configCrud.message.error + ' señales';
      showToast(this.toasterService, this.type, this.content);
    });
  }

  onClickPuntos($events, option, ptn) {
    const container = $events.target.parentNode.parentNode.parentNode.parentNode;
    let data1 = $events.target.parentNode.parentNode.children[1];
    let data2 = $events.target.parentNode.parentNode.children[2];

    var data = {
      moneda1: this.moneda1,
      valor: data1.value,
      moneda2: this.moneda2,
      porcentajeCapital: data2.value,
      positionId: 0
    };
    if (!data1.value || !data2.value) {
      console.log("vacio");
      return
    }
    switch (option) {
      case 'puntEntr': data.positionId = 3;
        this.posEntrada.push(data);
        break;
      case 'tipSal': data.positionId = 2;
        this.posSalida.push(data);
        break;
      case 'stopLoss': data.positionId = 1;
        this.posLoss.push(data);
        break;
    }
    const _body = this.renderer.createElement('div');

    this.renderer.addClass(_body, "row");

    const content = this.renderer.createElement('div');
    this.renderer.addClass(content, "contenedor");
    this.renderer.addClass(content, "input-group");
    this.renderer.setProperty(content, "id", option + "-data");

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

    const d2 = this.renderer.createElement('input');
    this.renderer.addClass(d2, "form-control");
    this.renderer.setProperty(d2, 'aria-label', "Amount (to the nearest dollar)");
    this.renderer.setProperty(d2, 'type', "text");
    this.renderer.setProperty(d2, 'value', data2.value + " %");
    this.renderer.setAttribute(d2, 'disabled', 'true');
    this.renderer.setProperty(d2, "id", ptn - 1);
    this.renderer.listen(d2, 'change', $events => {
      console.log(this.posEntrada)
      var input = $events.target;
      switch (option) {
        case 'puntEntr': this.posEntrada[input.id].porcentajeCapital = input.value.split(' ')[0];
          break;
        case 'tipSal': this.posSalida[input.id].porcentajeCapital = input.value.split(' ')[0];
          break;
        case 'stopLoss': this.posLoss[input.id].porcentajeCapital = input.value.split(' ')[0];
          break;
      }
      input.disabled = true;
    });

    const edit = this.renderer.createElement('span');
    this.renderer.addClass(edit, "input-group-btn");
    const bedit = this.renderer.createElement('button');
    this.renderer.addClass(bedit, "btn");
    this.renderer.addClass(bedit, "btn-secondary");
    this.renderer.setProperty(bedit, 'type', 'button');
    this.renderer.setProperty(bedit, 'id', 'false');
    this.renderer.listen(bedit, 'click', ($event) => {
      const oldBody = $event.target.closest('#' + option + '-data');
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
      console.log(id)
      const oldBody = $event.target.closest('#' + option + '-data').parentNode;
      //document.getElementById(option).removeChild(oldBody);
      this.renderer.removeChild(oldBody.parentNode, oldBody);
      this.refresh(option, id);
    });
    this.renderer.appendChild(remove, bremove);
    const iremove = this.renderer.createElement('i');
    this.renderer.addClass(iremove, "fa");
    this.renderer.addClass(iremove, "fa-times-circle");
    this.renderer.appendChild(bremove, iremove);

    this.renderer.appendChild(content, span);
    this.renderer.appendChild(content, d1);
    this.renderer.appendChild(content, d2);
    this.renderer.appendChild(content, edit);
    this.renderer.appendChild(content, remove);

    this.renderer.appendChild(_body, content);

    let lenght = container.children.length;
    this.renderer.insertBefore(container, _body, container.children[lenght - 1]);

    data1.value = '';
    data2.value = '';

    switch (option) {
      case 'puntEntr': this.pntEnt += 1; break;
      case 'tipSal': this.tpSal += 1; break;
      case 'stopLoss': this.stopLoss += 1; break;
    }
  }

  refresh(opc, id) {
    var node = document.getElementById(opc).children;
    for (let i = 1; i < node.length - 1; i++) {
      var collection = node[i].children[0].children;
      // console.log(node[i])
      collection[0].innerHTML = 'Punto ' + i;
      for (let ii = 1; ii < collection.length - 2; ii++) {
        collection[ii].id = '' + i;
      };
      collection[4].id = '' + (i - 1);
    }
    switch (opc) {
      case 'puntEntr': this.pntEnt = node.length - 1; this.posEntrada.splice(id, 1); break;
      case 'tipSal': this.tpSal = node.length - 1; this.posSalida.splice(id, 1); break;
      case 'stopLoss': this.stopLoss = node.length - 1; this.posLoss.splice(id, 1); break;
    }
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
}
