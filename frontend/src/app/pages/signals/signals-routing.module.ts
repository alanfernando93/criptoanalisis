import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalsComponent } from './signals.component';
import { signalsListComponent } from './list/signalsList.component';
import { signalsViewComponent } from './view/signalsView.component';

const routes: Routes = [{
  path: '',
  component: SignalsComponent,
  children: [{
    path: 'signals-list',
    component: signalsListComponent
  },
  {
    path: 'signals-view',
    component: signalsViewComponent,
  },
  {
    path: 'signals-view/:signalId',
    component: signalsViewComponent,
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
  signalsListComponent,
  signalsViewComponent
];
