import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { signalAllComponent } from './../../@theme/components/signalAll/signalAll.component'
import { SignalsRoutingModule, routedComponents } from './signals-routing.module';
import { MomentModule } from 'angular2-moment';
import { signalsListComponent } from './list/signalsList.component';
import { signalsViewComponent } from './view/signalsView.component';
import { SignalsService } from './signals.service';

@NgModule({
    imports: [
      ThemeModule,
      SignalsRoutingModule,
      MomentModule
    ],
    exports:[
      signalsListComponent,
      signalsViewComponent,
      signalAllComponent,
     ],
    declarations:[
      ...routedComponents,
      signalsListComponent,
      signalsViewComponent,
      signalAllComponent
    ],
    providers:[SignalsService]
  })
  
  export class SignalsModule {}