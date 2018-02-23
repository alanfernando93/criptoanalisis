import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderTwoComponent } from './headertwo.component';
import { ListComponent } from '../../../pages/market/list/list.component';

const routes: Routes = [
    {
        path: 'menu', component: ListComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class HeaderTwoRoutingModule {}

export const routedComponents = [
  HeaderTwoComponent,
  ListComponent
];