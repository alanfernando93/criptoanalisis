import { NgModule } from'@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { AdvisoriesRoutingModule, routedComponents } from './advisories-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        AdvisoriesRoutingModule
    ],
    declarations: [
        ...routedComponents,
    ],
    providers:[]
})
export class AdvisoriesModule {}