import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';

import { PublishComponent } from './publish.component';
import { PublishNewsComponent } from './news/news.component';
import { SignalComponent } from './signal/signal.component';
import { NewsService } from '../news/news.service';
import { CoinsService } from '../coins/coins.service';
import { SignalsService } from '../signals/signals.service';
import { InputFileModule } from 'ngx-input-file';

@NgModule({
    imports: [
        ThemeModule,
        ToasterModule
    ],
    declarations: [
        PublishComponent,
        PublishNewsComponent,
        SignalComponent
    ],
    providers: [NewsService,CoinsService,SignalsService],
})
export class PublishModule { }
