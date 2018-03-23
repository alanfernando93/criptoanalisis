import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { SignalsRoutingModule, routedComponents } from './signals-routing.module';
import { MomentModule } from 'angular2-moment';

import { SignalsService } from './signals.service';

@NgModule({
    imports: [
      ThemeModule,
      SignalsRoutingModule,
      MomentModule
    ],
    declarations:[
      ...routedComponents,
    ],
    providers:[SignalsService]
  })
  
  export class SignalsModule {}