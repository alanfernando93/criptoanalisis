import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';

import { PublishComponent} from './publish.component';
import { PublishNewsComponent } from './news/news.component';
import { SignalComponent } from './signal/signal.component';
import { CoinComponent } from './coin/coin.component';
import { AdvisoryComponent } from './advisory/advisory.component';

import { NewsService } from '../news/news.service';
import { CoinsService } from '../coins/coins.service';
import { MarketsService } from "../markets/markets.service";
import { SignalsService } from '../signals/signals.service';
<<<<<<< HEAD
import { AdvisoriesService } from '../advisories/advisories.service';

=======
import { CropperModalComponent } from '../../@theme/components/cropper/croppermodal.component';
>>>>>>> develop

@NgModule({
    imports: [
        ThemeModule,
        ToasterModule
    ],
    declarations: [
        PublishComponent,
        PublishNewsComponent,
    
        SignalComponent,
<<<<<<< HEAD
        AdvisoryComponent,
        CoinComponent
    ],
    entryComponents: [],
    providers: [NewsService,CoinsService,SignalsService,MarketsService,AdvisoriesService],
=======
        CoinComponent,
        CropperModalComponent,
    ],
    entryComponents: [CropperModalComponent],
    providers: [NewsService,CoinsService,SignalsService,MarketsService],
>>>>>>> develop
})
export class PublishModule { }
