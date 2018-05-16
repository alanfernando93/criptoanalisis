import { Component, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'ngx-userDesign',
    templateUrl: './userDesign.component.html',
    styleUrls: ['./userDesign.component.scss']
})
export class userDesignComponent {

    @Input() ImageUser: any;
    @Input() dataUser: any = [];
    @Input() dataUserPerfil: any = [];
    @Input() dataUserSymbol: any = [];
    @Input() dataUserName: any = [];
    @Input() dataUserPuntos: any = [];
    @Input() dataUserFama: any = [];
    @Input() dataAnswer: any = [];
    
    constructor(){

    }

    getInitials(name) {
        if (name) {
          var names = name.split(' ');
          return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
        }
        return '';
      }
}