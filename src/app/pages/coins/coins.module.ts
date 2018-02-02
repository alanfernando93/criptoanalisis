import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { CoinsRoutingModule, routedComponents } from './coins-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        CoinsRoutingModule,
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: []
})
export class CoinsModule {}


