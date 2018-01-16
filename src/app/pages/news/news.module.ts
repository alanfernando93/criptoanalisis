import { NgModule } from '@angular/core';
// import { Ng2ListModule } from 'ng2-list';

import { ThemeModule } from './../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';

import { NoticiasService } from './noticias.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
    // Ng2ListModule
  ],
  declarations:[
    ...routedComponents,
  ],
  providers:[ NoticiasService ]
})

export class NewsModule {}
