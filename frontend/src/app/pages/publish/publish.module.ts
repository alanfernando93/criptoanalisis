import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';

import { PublishComponent } from './publish.component';
import { NewsComponent } from './news/news.component';
import { SignalComponent } from './signal/signal.component';
import { CoinComponent } from './coin/coin.component';
import { AdvisoryComponent } from './advisory/advisory.component';

import { NewsService } from '../news/news.service';
import { CoinsService } from '../coins/coins.service';
import { MarketsService } from '../markets/markets.service';
import { SignalsService } from '../signals/signals.service';
import { AdvisoriesService } from '../advisories/advisories.service';

import { CropperComponent } from '../../@theme/components/cropper/cropper.component';
import { CryptoCompareService } from '../../@core/data/cryptocompare.service';

const Services = [
    NewsService,
    CoinsService,
    SignalsService,
    MarketsService,
    AdvisoriesService,
    CryptoCompareService,
]

@NgModule({
    imports: [
        ThemeModule,
        ToasterModule,
    ],
    declarations: [
        PublishComponent,
        NewsComponent,
        SignalComponent,
        CoinComponent,
        AdvisoryComponent,
        // CropperModalComponent,
    ],
    entryComponents: [CropperComponent],
    providers: Services,
})
export class PublishModule { }
