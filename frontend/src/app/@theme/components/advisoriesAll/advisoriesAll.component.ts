import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-advisoriesAll',
    templateUrl: './advisoriesAll.component.html',
    styleUrls: ['./advisoriesAll.component.scss'],
})
export class AdvisoriesAllComponent {

    @Input() listAdvisories: any;
    @Input() listAdvisories2: any;

    @Input() design: any;

    constructor() {

    }
}
