import { NgModule } from '@angular/core';
import { ThemeModule } from './../../@theme/theme.module';
import { AdvisoryRoutingModule, routedComponents } from './Advisories-routing.module';

@NgModule({
  imports: [
      ThemeModule,
      AdvisoryRoutingModule
  ],
  declarations:[
      ...routedComponents,
  ],
  providers:[]
})
export class AdvisoryModule {}