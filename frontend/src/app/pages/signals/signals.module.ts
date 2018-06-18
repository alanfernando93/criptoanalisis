import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { SignalsRoutingModule, routedComponents } from './signals-routing.module';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { SignalsService } from './signals.service';

@NgModule({
    imports: [
      ThemeModule,
      SignalsRoutingModule,
      FormsModule,
    ],
    exports: [
      ListComponent,
      ViewComponent,
     ],
    declarations: [
      ...routedComponents,
      ListComponent,
      ViewComponent,
    ],
    providers: [SignalsService],
  })

  export class SignalsModule {}
