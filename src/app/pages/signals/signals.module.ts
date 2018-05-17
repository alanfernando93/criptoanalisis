import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { signalAllComponent } from './../../@theme/components/signalAll/signalAll.component'
import { commentComponent } from './../../@theme/components/comment/comment.component';
import { userDesignComponent } from '../../@theme/components/userDesign/userDesign.component';
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
      commentComponent,
      userDesignComponent
    ],
    declarations:[
      ...routedComponents,
      signalsListComponent,
      signalsViewComponent,
      commentComponent,
      userDesignComponent,
      signalAllComponent
    ],
    providers:[SignalsService]
  })
  
  export class SignalsModule {}