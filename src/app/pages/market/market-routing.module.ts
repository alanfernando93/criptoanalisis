import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketComponent } from './market.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
    path: '',
    component: MarketComponent,
    children: [{
        path: 'list',
        component: ListComponent,
    }
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MarketRoutingModule {}

export const routedComponents = [
    MarketComponent,
    ListComponent
];