import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { newsListComponent } from './list/newsList.component';
import { newsViewComponent } from './view/newsView.component';

const routes: Routes = [{
  path: '',
  component: NewsComponent,
  children: [{
    path: 'news-list',
    component: newsListComponent
  },
  {
    path: 'news-view',
    redirectTo: 'pages'
  },
  {
    path: 'news-view/:newsId',
    component: newsViewComponent
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class NewsRoutingModule{ }

export const routedComponents = [
  NewsComponent,
  newsListComponent,
  newsViewComponent,
];
