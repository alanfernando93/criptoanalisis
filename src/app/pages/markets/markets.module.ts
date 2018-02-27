import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { MarketsRoutingModule, routedComponents } from './markets-routing.module';

import { MarketsService } from './markets.service';

@NgModule({
    imports: [
        ThemeModule,
        MarketsRoutingModule,
    ],
    declarations:[
        ...routedComponents,
    ],
    providers: [MarketsService]
})
export class MarketsModule {}