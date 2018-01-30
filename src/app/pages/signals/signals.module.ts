import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { SignalsRoutingModule, routedComponents } from './signals-routing.module';

@NgModule({
    imports: [
      ThemeModule,
      SignalsRoutingModule,
    ],
    declarations:[
      ...routedComponents,
    ],
    providers:[]
  })
  
  export class SignalsModule {}