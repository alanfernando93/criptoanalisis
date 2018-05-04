import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { ListSignalComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  component: NewsComponent,
  children: [{
    path: 'list',
    component: ListSignalComponent
  },
  {
    path: 'view',
    redirectTo: 'pages'
  },
  {
    path: 'view/:newsId',
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
  ListSignalComponent,
  ViewComponent,
];
