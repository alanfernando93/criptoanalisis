import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-advisories-body',
    templateUrl: './advisories-body.component.html',
    styleUrls: ['./advisories-body.component.scss'],
})
export class AdvisoriesBodyComponent {

    @Input() listAdvisories: any;
    @Input() listAdvisories2: any;

    @Input() design: any;

    constructor() {

    }
}
