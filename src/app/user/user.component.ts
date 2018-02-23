import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { StateService } from '../@core/data/state.service';


@Component({
    selector: 'ngx-user',
    template: `
        <nb-sample-layout>
            <router-outlet></router-outlet>
        </nb-sample-layout>
    `,
})

export class UserComponent implements OnInit {

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