import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';

// import { NewsService } from '../../services/news.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
  ],
  declarations:[
    ...routedComponents,
  ],
  providers:[ ]
})

export class NewsModule {}
