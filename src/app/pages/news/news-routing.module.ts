import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  component: NewsComponent,
  children: [{
    path: 'news-list',
    component: ListComponent
  },
  {
    path: 'news-view',
    redirectTo: 'pages'
  },
  {
    path: 'news-view/:newsId',
    component: ViewComponent
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
  ListComponent,
  ViewComponent,
];
