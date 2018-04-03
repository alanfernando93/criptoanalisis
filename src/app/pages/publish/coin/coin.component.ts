import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CoinsService } from '../../coins/coins.service'
import { MarketsService } from '../../markets/markets.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div id="content" class="modal-body">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent implements OnInit{
  @Input() file;
  form:any = {};
  
  constructor(
    public activeModal: NgbActiveModal,
    private coinsService: CoinsService,
  ) { }

  ngOnInit(){
    var div = document.getElementById('content');    
    this.coinsService.getTextForm(this.file).subscribe(data => {
      div.innerHTML = data['_body'];
    })
  }
}

@Component({
  selector: 'ngx-publish-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  form:any = {};

  coins: any = []
  markets: any = []
  titles: any = [];
  coin: any;
  market: any;

  constructor(
    private modalService: NgbModal,
    private coinsService: CoinsService,
    private marketService: MarketsService,
  ) { }

  ngOnInit() {
    this.coinsService.getCoinsName().subscribe(data => {
      data.monedas.forEach(element => {
        this.coins.push(element.name)
      });
    })
    this.marketService.getMarkets().subscribe(data => {
      data.forEach(element => {
        this.markets.push(element.nombre)
      });
    })
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

  open(file) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.file = file.toLowerCase();
    console.log(modalRef)
  }

  formatter = (result: string) => result.toUpperCase();

  searchCoins = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.coins.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  searchMarkets = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.markets.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
}
