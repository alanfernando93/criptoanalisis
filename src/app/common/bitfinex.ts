import { Injectable, NgModule } from '@angular/core';
import { Http } from '@angular/http'
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BitFinexCrypto extends Socket {

    constructor(private http: Http) {
        super({ url: 'wss://streamer.cryptocompare.com', options: {} });
    }

    sendBTC(msg?: string) {
        this.emit('SubAdd', { subs: ['0~Poloniex~BTC~USD'] });
        // this.on('m', function (data) {
        //     let obj = data.split('~');
        //     console.log(obj[8]);
        // });
    }

    getCurrentPrice() {
        let object;
        return new Observable(observer => {
            this.on('m', function (data) {
                object = data.split('~');
                observer.next(object[8]);
                // console.log(data);
            });
            // return () => this.disconnect();
        })        
    }

    close() {
        return new Observable(observer => {
            this.disconnect();
            observer.next("End Connection")
        })
    }

    getTrades() {
        return this.http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR").map(data => data.json());
    }
}