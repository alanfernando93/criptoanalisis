import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';
import { FormsModule } from '@angular/forms';

import { NewsListComponent } from './list/newsList.component';
import { NewsViewComponent } from './view/newsView.component';
import { NewsService } from './news.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
    FormsModule,

  ],
  exports: [
    NewsListComponent,
    NewsViewComponent,
  ],
  declarations: [
    ...routedComponents,
    NewsListComponent,
    NewsViewComponent,
  ],
  providers: [NewsService],
})

export class NewsModule {}
