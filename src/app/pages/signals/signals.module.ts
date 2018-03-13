import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { SignalsRoutingModule, routedComponents } from './signals-routing.module';

import { SignalsService } from './signals.service';

@NgModule({
    imports: [
      ThemeModule,
      SignalsRoutingModule,
    ],
    declarations:[
      ...routedComponents,
    ],
    providers:[SignalsService]
  })
  
  export class SignalsModule {}