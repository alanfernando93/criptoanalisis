import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-user',
    template: `
        <ngx-sample-layout>
            <router-outlet></router-outlet>
        </ngx-sample-layout>
    `,
})

export class UserComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}
