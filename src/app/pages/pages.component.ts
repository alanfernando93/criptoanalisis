import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <nb-sample-layout>      
      <router-outlet></router-outlet>
    </nb-sample-layout>
  `,
})
export class PagesComponent {


  constructor() {}
}
