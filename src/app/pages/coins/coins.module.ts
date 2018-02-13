import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { CoinsRoutingModule, routedComponents } from './coins-routing.module';

//import { NoticiasService } from './noticias.service';

@NgModule({
  imports: [
    ThemeModule,
    CoinsRoutingModule,
  ],
  declarations:[
    ...routedComponents,
  ],
  providers:[]
})

export class CoinsModule {}
