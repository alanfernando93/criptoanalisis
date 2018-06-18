import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { PublishComponent } from './publish/publish.component';

import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'chat',
    component: ChatComponent,
  }, {
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'publish',
    component: PublishComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'advisories',
    loadChildren: './advisories/advisories.module#AdvisoryModule',
  }, {
    path: 'news',
    loadChildren: './news/news.module#NewsModule',
  }, {
    path: 'markets',
    loadChildren: './markets/markets.module#MarketsModule',
  }, {
    path: 'signals',
    loadChildren: './signals/signals.module#SignalsModule',
  }, {
    path: 'coins',
    loadChildren: './coins/coins.module#CoinsModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
