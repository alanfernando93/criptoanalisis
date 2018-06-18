import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss'],
})
export class ShareComponent {

    @Input() titleFacebook: any = [];
    @Input() descripFacebook: any = [];
    @Input() imageFacebook: any;

    @Input() titleTwitter: any = [];
    @Input() tagTwitter: any = [];

    @Input() titleLinkedin: any = [];
    @Input() descripLinkedin: any = [];

    @Input() titleWhatsapp: any = [];
    @Input() descripWhatsapp: any = [];

    constructor() {

    }
}
