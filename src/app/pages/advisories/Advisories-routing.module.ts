import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvisoriesComponent } from './advisories.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { InstruccionComponent } from './instruccion/instruccion.component';
import { PagoComponent } from './pago/pago.component';
import { DisputaComponent } from './disputa/disputa.component';

const routes: Routes = [{
    path: '',
    component: AdvisoriesComponent,
    children: [{
        path: 'list',
        component: ListComponent,
            },
        {
        path: 'view',
       component: ViewComponent,
    },
    {
        path: 'view/:advisoryId',
        component: ViewComponent,
      },
    {
        path: 'instruccion',
       component: InstruccionComponent,
    },
    {
        path: 'view/:advisoryId/instruccion',
       component: InstruccionComponent,
    },
    {
        path: 'pago',
       component: PagoComponent,
    },
    {
        path: 'view/:advisoryId/pago',
       component: PagoComponent,
    },
    {
        path: 'disputa',
       component: DisputaComponent,
    },
    {
        path: 'view/:advisoryId/disputa' ,
       component: DisputaComponent,
    }
    
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdvisoryRoutingModule {}

export const routedComponents = [
    AdvisoriesComponent,
    ListComponent,
    ViewComponent,
    InstruccionComponent,
    PagoComponent,
    DisputaComponent,
];