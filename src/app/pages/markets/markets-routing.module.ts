import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketsComponent } from './markets.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
    path: '',
    component: MarketsComponent,
    children: [{
        path: 'list',
        component: ListComponent,
    }
    ],
}];
@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MarketsRoutingModule {}

export const routedComponents = [
    MarketsComponent,
    ListComponent
];