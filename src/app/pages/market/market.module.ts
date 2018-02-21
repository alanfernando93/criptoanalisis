import { NgModule } from '@angular/core';
import { ThemeModule } from './../../@theme/theme.module';
import { MarketRoutingModule, routedComponents } from './market-routing.module';

@NgModule({
  imports: [
      ThemeModule,
      MarketRoutingModule
  ],
  declarations:[
      ...routedComponents,
  ],
  providers:[]
})
export class MarketModule {}