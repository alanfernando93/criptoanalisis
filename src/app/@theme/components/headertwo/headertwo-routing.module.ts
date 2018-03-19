import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderTwoComponent } from './headertwo.component';

const routes: Routes = [
    {
        path: 'list/marketsId'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HeaderTwoRoutingModule {}

export const routedComponents = [
  HeaderTwoComponent
];