import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsListComponent } from './list/newsList.component';
import { NewsViewComponent } from './view/newsView.component';

const routes: Routes = [{
  path: '',
  component: NewsComponent,
  children: [{
    path: 'news-list',
    component: NewsListComponent,
  },
  {
    path: 'news-view',
    redirectTo: 'pages',
  },
  {
    path: 'news-view/:newsId',
    component: NewsViewComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class NewsRoutingModule { }

export const routedComponents = [
  NewsComponent,
  NewsListComponent,
  NewsViewComponent,
];
