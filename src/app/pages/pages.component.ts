import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'ngx-pages',
  template: `
    <nb-sample-layout>      
      <router-outlet></router-outlet>
    </nb-sample-layout>
  `,
})
export class PagesComponent {
  
}
