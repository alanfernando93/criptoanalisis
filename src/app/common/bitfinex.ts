import { Injectable, NgModule } from '@angular/core';
import { Http } from '@angular/http'
import { Socket } from 'ng-socket-io';

@Injectable()
export class BitFinexCrypto extends Socket {

    constructor(private http: Http) {
        super({ url: 'wss://streamer.cryptocompare.com', options: {} });
    }

    sendBTC(msg: string) {
        this.emit('SubAdd', { subs: ['0~Poloniex~BTC~USD'] });
        this.on('m', function (data) {
            console.log(data);
        });
    }

    get() {
        this.on('m', function (data) {
            console.log(data);
        });
    }

    getTrades() {
        return this.http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR").map(data => data.json());
    }
}