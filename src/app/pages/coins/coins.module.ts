import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { CoinsRoutingModule, routedComponents } from './coins-routing.module';

import { CoinsService } from './coins.service';

@NgModule({
  imports: [
    ThemeModule,
    CoinsRoutingModule,
  ],
  declarations:[
    ...routedComponents,
  ],
  providers:[CoinsService]
})

export class CoinsModule {}
