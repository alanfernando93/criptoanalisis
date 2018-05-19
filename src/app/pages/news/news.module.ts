import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { newsAllComponent } from '../../@theme/components/newsAll/newsAll.component';
import { commentComponent } from '../../@theme/components/comment/comment.component';
import { userDesignComponent } from '../../@theme/components/userDesign/userDesign.component';
import { NewsRoutingModule, routedComponents } from './news-routing.module';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { newsListComponent } from './list/newsList.component';
import { newsViewComponent } from './view/newsView.component';
import { NewsService } from './news.service';

@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
    MomentModule,
    FormsModule
    
  ],
  exports:[
    newsListComponent,
    newsViewComponent,
    newsAllComponent,
    commentComponent,
    userDesignComponent
  ],
  declarations:[
    ...routedComponents,
    newsListComponent,
    newsViewComponent,
    commentComponent,
    userDesignComponent,
    newsAllComponent
  ],
  providers:[NewsService]
})

export class NewsModule {}
