import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeModule } from '../../@theme/theme.module';

import { PublishComponent } from './publish.component';
import { PublishNewsComponent } from './news/news.component';
import { SignalComponent } from './signal/signal.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        PublishComponent,
        PublishNewsComponent,
        SignalComponent
    ],
    providers: [],
})
export class PublishModule { }
