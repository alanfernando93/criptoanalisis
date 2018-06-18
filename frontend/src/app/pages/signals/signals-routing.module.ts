import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalsComponent } from './signals.component';
import { SignalsListComponent } from './list/signalsList.component';
import { SignalsViewComponent } from './view/signalsView.component';

const routes: Routes = [{
  path: '',
  component: SignalsComponent,
  children: [{
    path: 'signals-list',
    component: SignalsListComponent,
  },
  {
    path: 'signals-view',
    component: SignalsViewComponent,
  },
  {
    path: 'signals-view/:signalId',
    component: SignalsViewComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SignalsRoutingModule { }

export const routedComponents = [
  SignalsComponent,
  SignalsListComponent,
  SignalsViewComponent,
];
