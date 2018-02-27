import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalsComponent } from './signals.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  component: SignalsComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'view',
    component: ViewComponent,
  },
  {
    path: 'view/:signalId',
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
  ViewComponent,
];
