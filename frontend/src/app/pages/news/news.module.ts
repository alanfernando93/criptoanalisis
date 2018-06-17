import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { NewsService } from './news.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
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
  providers: [NewsService],
})

export class NewsModule {}
