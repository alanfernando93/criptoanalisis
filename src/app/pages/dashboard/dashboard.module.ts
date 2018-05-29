import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';

import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DashboardRoutingModule,
    MomentModule
  ],
  declarations: [
    DashboardComponent,
    ...routedComponents
  ],
  
})
export class DashboardModule { }
