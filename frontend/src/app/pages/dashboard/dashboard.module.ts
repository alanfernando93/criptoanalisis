import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { MomentModule } from 'angular2-moment';

import { NewsService } from '../news/news.service';
import { SignalsService } from '../signals/signals.service';

@NgModule({
  imports: [
    ThemeModule,
    DashboardRoutingModule,
    MomentModule,
  ],
  declarations: [
    DashboardComponent,
    ...routedComponents,
  ],
  providers: [NewsService, SignalsService]
})
export class DashboardModule { }
