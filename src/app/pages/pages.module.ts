import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PublishModule } from './publish/publish.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

import { NewsService } from '../services/news.service';
import { CoinsService } from '../services/coins.service';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    PublishModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
],
providers:[]
})
export class PagesModule {
}
