import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvisoriesComponent } from './advisories.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { InstruccionComponent } from './instruccion/instruccion.component';
import { PagoComponent } from './pago/pago.component';

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
        path: 'instruccion',
       component: InstruccionComponent,
    },
    {
        path: 'pago',
       component: PagoComponent,
    },
    
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
];