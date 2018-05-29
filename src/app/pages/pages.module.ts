import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PublishModule } from './publish/publish.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ChatModule } from './chat/chat.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ChatModule,
    PublishModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
],
providers:[]
})
export class PagesModule {
}
