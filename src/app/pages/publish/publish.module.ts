import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeModule } from '../../@theme/theme.module';

import { PublishComponent } from './publish.component';
import { PublishNewsComponent } from './news/news.component';
import { SignalComponent } from './signal/signal.component';
import { NewsService } from '../news/news.service';
import { CoinsService } from '../coins/coins.service';
import { SignalsService } from '../signals/signals.service';
import { PositionsService } from './positions.service'

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        PublishComponent,
        PublishNewsComponent,
        SignalComponent
    ],
    providers: [NewsService,CoinsService,SignalsService,PositionsService],
})
export class PublishModule { }
