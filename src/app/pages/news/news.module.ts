import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';

import { NoticiasService } from './noticias.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
  ],
  declarations:[
    ...routedComponents,
  ],
  providers:[ NoticiasService ]
})

export class NewsModule {}
