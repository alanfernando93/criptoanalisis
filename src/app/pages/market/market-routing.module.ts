import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketComponent } from './market.component';
import { ListComponent } from './list/list.component';
import { Route } from '@angular/compiler/src/core';

const routes: Routes = [{
    path: '',
    component: MarketComponent,
    children: [{
        path: 'list',
        component: ListComponent,
    },
    {
        path: 'list:/idMarket',
        component: ListComponent,
    }
    ],
}];

export class MarketRoutingModule {}

export const routedComponents = [
    MarketComponent,
    ListComponent
];