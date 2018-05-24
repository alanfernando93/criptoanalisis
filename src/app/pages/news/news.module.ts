import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { newsAllComponent } from '../../@theme/components/newsAll/newsAll.component';
import { NewsRoutingModule, routedComponents } from './news-routing.module';
import { FormsModule } from '@angular/forms';

import { newsListComponent } from './list/newsList.component';
import { newsViewComponent } from './view/newsView.component';
import { NewsService } from './news.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
    FormsModule
    
  ],
  exports:[
    newsListComponent,
    newsViewComponent,
    newsAllComponent,
  ],
  declarations:[
    ...routedComponents,
    newsListComponent,
    newsViewComponent,
    newsAllComponent
  ],
  providers:[NewsService]
})

export class NewsModule {}
