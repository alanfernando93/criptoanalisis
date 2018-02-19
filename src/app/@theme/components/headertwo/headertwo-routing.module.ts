import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from '../../../pages/coins/list/list.component';

const routes: Routes = [
    {
        path: 'menu', component: ListComponent
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})

export class HeaderTwoRoutingModule {}
export const routedComponents = [
  ListComponent
];