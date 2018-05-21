import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinsComponent } from './coins.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { ViewtwoComponent } from './viewtwo/viewtwo.component';

const routes: Routes = [{
    path: '',
    component: CoinsComponent,
    children: [{
        path: 'list',
        component: ListComponent,
    }, {
        path: 'view',
        component: ViewComponent,
    }, {
        path: 'viewtwo',
        component: ViewtwoComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CoinsRoutingModule { }

export const routedComponents = [
    CoinsComponent,
    ListComponent,
    ViewComponent,
    ViewtwoComponent
];