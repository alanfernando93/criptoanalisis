import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ThemeModule } from './../../@theme/theme.module';
import { CoinsRoutingModule, routedComponents } from './coins-routing.module';

import { CoinsService } from './coins.service';

@NgModule({
  imports: [
    ThemeModule,
    CoinsRoutingModule,
    HttpModule
  ],
  declarations:[
    ...routedComponents,
],
  providers:[CoinsService]
})

export class CoinsModule {}
