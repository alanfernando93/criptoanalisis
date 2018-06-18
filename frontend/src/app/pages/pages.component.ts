import { Component } from '@angular/core';


@Component({
  selector: 'ngx-pages',
  template: `
    <nb-sample-layout>
      <router-outlet></router-outlet>
    </nb-sample-layout>
  `,
})
export class PagesComponent { }
