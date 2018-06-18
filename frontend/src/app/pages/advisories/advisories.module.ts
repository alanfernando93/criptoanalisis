import { NgModule } from '@angular/core';
import { ThemeModule } from './../../@theme/theme.module';
import { AdvisoryRoutingModule, routedComponents } from './Advisories-routing.module';
import { AdvisoriesService } from './advisories.service';

@NgModule({
  imports: [
      ThemeModule,
      AdvisoryRoutingModule,
  ],
  declarations: [
      ...routedComponents,
  ],
  exports: []
,  providers: [AdvisoriesService],
})
export class AdvisoryModule {}
