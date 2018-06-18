import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { SignalsRoutingModule, routedComponents } from './signals-routing.module';
import { FormsModule } from '@angular/forms';

import { SignalsListComponent } from './list/signalsList.component';
import { SignalsViewComponent } from './view/signalsView.component';
import { SignalsService } from './signals.service';

@NgModule({
    imports: [
      ThemeModule,
      SignalsRoutingModule,
      FormsModule,
    ],
    exports: [
      SignalsListComponent,
      SignalsViewComponent,
     ],
    declarations: [
      ...routedComponents,
      SignalsListComponent,
      SignalsViewComponent,
    ],
    providers: [SignalsService],
  })
  export class SignalsModule {}
