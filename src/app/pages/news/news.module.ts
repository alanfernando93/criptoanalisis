import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { NewsService } from './news.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
    MomentModule,
    FormsModule
  ],
  declarations:[
    ...routedComponents,
  ],
  providers:[NewsService]
})

export class NewsModule {}
