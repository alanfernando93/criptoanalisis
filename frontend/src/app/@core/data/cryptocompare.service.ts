import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CryptoCompareService extends Socket {

    constructor(private http: Http) {
        super({ url: 'wss://streamer.cryptocompare.com', options: {} });
    }

    sendBTC(coin1: String = 'BTC', coin2: String = 'USD') {
        this.emit('SubAdd', { subs: [`0~Poloniex~${coin1}~${coin2}`] });
    }

    getCurrentPrice() {
        let object;
        return new Observable(observer => {
            this.on('m', function (data) {
                object = data.split('~');
                observer.next(object[8]);

            });
            // return () => this.disconnect();
        })
    }

    close() {
        return new Observable(observer => {
            this.disconnect();
            observer.next('End Connection')
        })
    }

    getTrades() {
        return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR').map(data => data.json());
    }
}
