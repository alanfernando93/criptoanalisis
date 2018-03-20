import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../../environments/environment';

import { SignalsService } from '../../signals/signals.service';
import { CoinsService } from "../../coins/coins.service";

class Pos {
    valor : String;
    porcentajeCapital : String;
    tipo : String;
    constructor(moneda1:String,moneda2:String){
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

    pntEnt = 1;
    tpSal = 1;
    stopLoss = 1;

    signal: any = {};

    moneda1 : String = "Moneda"
    moneda2 : String = "USD"

    positions : any = []
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

    constructor(
        private modalService: NgbModal,
        private renderer: Renderer2,
        private http: Http,
        private signalsService: SignalsService,
        private coinsService: CoinsService,
        private router: Router
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

    onSave() {
        this.signal.visible = "true";
        this.signal.usuarioId = this.userId;
        this.signalsService.add(this.signal).subscribe(resp=>{
            console.log(this.positions)
            let id = resp.id;
            this.positions.forEach((value,key) => {
                this.positions[key].signalId = id
                this.signalsService.setPosition(this.positions[key]).subscribe(respo => {})            
            });
        });
        // console.log(this.positions)
    }

    keyupHandlerFunction(event,opc) {
        switch (opc) {
            case 'CS': this.signal.AnalisisFundamental = event; break;
            case 'AT': this.signal.AnalisisTecnico = event; break;
        }
    }

    onClickPuntos($events, option, ptn) {
        let pos = new Pos(this.moneda1,this.moneda2);
        const container = $events.originalTarget.parentNode.parentNode.parentNode.parentNode;
        const data1 = $events.originalTarget.parentNode.parentNode.children[1];
        const data2 = $events.originalTarget.parentNode.parentNode.children[2];

        if(!data1.value || !data2.value) {
            console.log("vacio");
            return
        }
        switch (option) {
            case 'puntEntr': pos.tipo = "puntoEntrada"; break;
            case 'tipSal': pos.tipo = "puntoSalida"; break;
            case 'stopLoss': pos.tipo = "stopLoss"; break;
        }
        pos.valor = data1.value
        pos.porcentajeCapital = data2.value
        this.positions.push(pos)
        
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
}