import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';

import { PublishComponent } from './publish.component';
import { PublishNewsComponent } from './news/news.component';
import { SignalComponent } from './signal/signal.component';
import { CoinComponent } from './coin/coin.component';

import { NewsService } from '../news/news.service';
import { CoinsService } from '../coins/coins.service';
import { MarketsService } from "../markets/markets.service";
import { SignalsService } from '../signals/signals.service';

@NgModule({
    imports: [
        ThemeModule,
        ToasterModule
    ],
    declarations: [
        PublishComponent,
        PublishNewsComponent,
        SignalComponent,
        CoinComponent
    ],
    entryComponents: [],
    providers: [NewsService,CoinsService,SignalsService,MarketsService],
})
export class PublishModule { }
