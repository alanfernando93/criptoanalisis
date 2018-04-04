import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../../environments/environment';

import { SignalsService } from '../../signals/signals.service';
import { CoinsService } from "../../coins/coins.service";

import 'style-loader!angular2-toaster/toaster.css';

class Pos {
  /**
   * 
   * @param moneda1 
   * @param valor 
   * @param moneda2 
   * @param porcentajeCapital 
   * @param puntoId 
   */
  constructor(moneda1: String, valor: String, moneda2: String, porcentajeCapital: String, puntoId: Number) {
  }
}

@Component({
  selector: 'ngx-publish-signal',
  styleUrls: ['./signal.component.scss'],
  templateUrl: 'signal.component.html'
})

export class SignalComponent implements OnInit {
  @Input() idSignal: String = null;
  userId = environment.userId;
  closeResult: string;
  url = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
  myFile: File;

  pntEnt = 1;
  tpSal = 1;
  stopLoss = 1;

  signal: any = {};

  moneda1: String = "Moneda"
  moneda2: String = "Moneda"

  positions: any = []
  coins: any = [];

  types = [{
    id: 'USD'
  }, {
    id: 'BTC'
  }, {
    id: 'ETH'
  }];

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

  tipos = [{
    title: 'Comprar',
    key: true,
  }, {
    title: 'Vender',
    key: false,
  }]

  config: ToasterConfig
  title = null;
  content = `I'm cool toaster!`;
  type = 'default';

  constructor(
    private modalService: NgbModal,
    private renderer: Renderer2,
    private http: Http,
    private signalsService: SignalsService,
    private coinsService: CoinsService,
    private router: Router,
    private toasterService: ToasterService
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

    // this.type = 'error'
    // this.content = 'Se produjo un error con señales'
    // this.showToast(this.type, this.title, this.content);
  }

  onSave() {
    this.signal.visible = true;
    this.signal.tipo = this.tipoSignal.key;
    this.signal.count = "";
    this.signalsService.add(this.signal).subscribe(resp => {
      let body = new FormData();
      body.append('', this.myFile);
      this.signalsService.imageFileUpload(resp.id, body).subscribe((r: Response) => {
        // this.router.navigate(["/"]);
      })
      let id = resp.id;
      this.positions.forEach((value, key) => {
        this.positions[key].signalId = id
        this.signalsService.setPosition(this.positions[key]).subscribe(respo => { })
        this.type = 'success'
        this.content = 'Se guardo con exito!!!'
      }, erro => {
        this.type = 'error'
        this.content = 'Se produjo un error con los puntos'
      });
      this.showToast(this.type, this.title, this.content);
    }, error => {
      this.type = 'error'
      this.content = 'Se produjo un error con señales'
      this.showToast(this.type, this.title, this.content);
    });
  }

  keyupHandlerFunction(event, opc) {
    switch (opc) {
      case 'CS': this.signal.AnalisisFundamental = event; break;
      case 'AT': this.signal.AnalisisTecnico = event; break;
    }
  }

  onClickPuntos($events, option, ptn) {
    let positionId
    const container = $events.originalTarget.parentNode.parentNode.parentNode.parentNode;
    const data1 = $events.originalTarget.parentNode.parentNode.children[1];
    const data2 = $events.originalTarget.parentNode.parentNode.children[2];

    if (!data1.value || !data2.value) {
      console.log("vacio");
      return
    }
    switch (option) {
      case 'puntEntr': positionId = 3; break;
      case 'tipSal': positionId = 2; break;
      case 'stopLoss': positionId = 1; break;
    }
    this.positions.push(new Pos(this.moneda1, data1.value, this.moneda2, data2.value, positionId))

    const _body = this.renderer.createElement('div');
    this.renderer.addClass(_body, "row");

    const content = this.renderer.createElement('div');
    this.renderer.addClass(content, "contenedor");
    this.renderer.addClass(content, "input-group")

    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, "input-group-addon");
    this.renderer.appendChild(span, this.renderer.createText('Punto ' + ptn));

    const d1 = this.renderer.createElement('input');
    this.renderer.addClass(d1, "form-control");
    this.renderer.setProperty(d1, 'aria-label', "Amount (to the nearest dollar)");
    this.renderer.setProperty(d1, 'type', "text");
    this.renderer.setProperty(d1, 'value', data1.value + " " + this.moneda2);
    this.renderer.setAttribute(d1, 'disabled', 'true');

    const d2 = this.renderer.createElement('input');
    this.renderer.addClass(d2, "form-control");
    this.renderer.setProperty(d2, 'aria-label', "Amount (to the nearest dollar)");
    this.renderer.setProperty(d2, 'type', "text");
    this.renderer.setProperty(d2, 'value', data2.value + " %");
    this.renderer.setAttribute(d2, 'disabled', 'true');

    const edit = this.renderer.createElement('span');
    this.renderer.addClass(edit, "input-group-btn");
    const bedit = this.renderer.createElement('button');
    this.renderer.addClass(bedit, "btn");
    this.renderer.addClass(bedit, "btn-secondary");
    this.renderer.setProperty(bedit, 'type', 'button');
    this.renderer.listen(bedit, 'click', ($event) => {
      const oldBody = $event.originalTarget.parentNode.parentNode;
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
    this.renderer.listen(bremove, 'click', ($event) => {
      const oldBody = $event.originalTarget.parentNode.parentNode.parentNode;
      this.renderer.removeChild(oldBody.parentNode, oldBody);
      // this.punto -= 1;
      switch (option) {
        case 'puntEntr': this.pntEnt -= 1; break;
        case 'tipSal': this.tpSal -= 1; break;
        case 'stopLoss': this.stopLoss -= 2; break;
      }
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

    // this.punto += 1;
    switch (option) {
      case 'puntEntr': this.pntEnt += 1; break;
      case 'tipSal': this.tpSal += 1; break;
      case 'stopLoss': this.stopLoss += 1; break;
    }
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

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'flyRight',
      limit: 5,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  readUrl(files) {
    var img = new Image();
    if (files && files[0]) {
      this.myFile = files[0]
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
      img.src = this.url
      reader.readAsDataURL(files[0]);
    }
  }
}