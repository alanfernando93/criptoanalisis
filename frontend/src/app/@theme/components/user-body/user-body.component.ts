import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-user-body',
    templateUrl: './user-body.component.html',
    styleUrls: ['./user-body.component.scss'],
})
export class UserBodyComponent {

    @Input() dataCommUser: any = [];
    @Input() dataUserPerfil: any;
    @Input() dataUserImage: any = [];
    @Input() dataUserSymbol: any = [];
    @Input() dataUserName: any = [];
    @Input() dataUserPuntos: any = [];
    @Input() dataUserFama: any = [];
    @Input() dataAnswer: any = [];
    @Input() dataUserId: any = [];

    constructor() {

    }

    getInitials(name) {
        if (name) {
            const names = name.split(' ');
            return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
        }
        return '';
    }
}
