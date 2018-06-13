import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
    selector: 'ngx-user',
    template: `
        <nb-sample-layout>
            <router-outlet></router-outlet>
        </nb-sample-layout>
    `,
})

export class UserComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}