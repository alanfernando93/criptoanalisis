import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoinsService } from '../../coins/coins.service'
import { MarketsService } from '../../markets/markets.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'ngx-publish-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  coins: any = []
  markets: any = []
  titles: any = [];
  coin: any;
  market: any;

  constructor(
    private coinsService: CoinsService,
    private marketService: MarketsService
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
      data.forEach(element => {
        if(!element.correspondencia)
          this.titles.push(element)
      });
      console.log(this.titles)
    })
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
