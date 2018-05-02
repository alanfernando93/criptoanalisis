import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalsComponent } from './signals.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  component: SignalsComponent,
  children: [{
    path: 'signals-list',
    component: ListComponent,
  },
  {
    path: 'signals-view',
    component: ViewComponent,
  },
  {
    path: 'signals-view/:signalId',
    component: ViewComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SignalsRoutingModule{ }

export const routedComponents = [
  SignalsComponent,
  ListComponent,
  ViewComponent
];
