import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvisoriesComponent } from './advisories.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
    path: '',
    component: AdvisoriesComponent,
    children: [{
        path: 'list',
        component: ListComponent,
    },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})

export class AdvisoriesRoutingModule { }

export const routedComponents = [
    AdvisoriesComponent,
    ListComponent
];