import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { StateService } from '../@core/data/state.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>      
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  sidebars = [];

  constructor(protected stateService: StateService) {
    this.stateService.getSidebarStates()
      .subscribe((sidebars: any[]) => this.sidebars = sidebars);
  }

  ngOnInit() {
    //Usando el sidebar en el lado derecho
    this.stateService.setSidebarState(this.sidebars[1]);
  }
}
