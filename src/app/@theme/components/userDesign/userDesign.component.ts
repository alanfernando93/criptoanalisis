import { Component, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'ngx-userDesign',
    template: `<span class="chat-img pull-left" *ngIf="dataCommUser">
    <a placement="right" [ngbPopover]="popContentComment" triggers="mouseover">
        <img *ngIf="dataUserSymbol" class="img-circle rounded-circle" src="../../../../assets/images/letra.png">
        </a>
</span>
<div class="chat-body clearfix" *ngIf="dataCommUser">
    <div class="header">
        <a class="primary-font" href="/pages/user/profile/{{dataUserId}}">
            {{dataUserName}}
        </a>
        <small>
            <p class="badge badge-info font-w-light">{{dataUserPuntos}} P</p>
        </small>
        <small *ngFor="let famaUser of dataUserFama">
            <p class="badge badge-info font-w-light">{{famaUser.valor}} {{famaUser.symbol}}</p>
        </small>
    </div>
</div>
<ng-template #popContentComment>
    <div class="pop_style" *ngIf="dataCommUser">
        <div class="media">
            <!-- <img *ngIf="dataUserPerfil" class="mr-3 image_pop" src="{{dataUserImage}}"> -->
            <div *ngIf="dataUserPerfil" class="user-picture background" [style.background-color]="color">
                <ng-container>
                    <img class="image_pop" src="../../../../assets/images/image.png">
                </ng-container>
            </div>
            <div class="media-body">
                <h5 class="mt-0 text-center">{{dataUserName}}</h5>
                <div class="text-center">
                    <h6>
                        <span class="badge badge-primary font-w-light">{{dataUserPuntos}} P</span>
                        <span class="badge badge-info font-w-light" *ngFor="let famaUser of dataUserFama">{{famaUser.valor}} {{famaUser.symbol}}</span>
                    </h6>
                </div>
                <div [(ngModel)]="dividedButtonGroupOne" ngbRadioGroup class="btn-group btn-divided-group btn-outline-divided-group btn-group-full-width col-md-12 bton-seguir">
                    <label ngbButtonLabel class="btn btn-outline-primary btn-tn">
                        <input ngbButton type="radio" value="left"> Mensaje
                    </label>
                    <label ngbButtonLabel class="btn btn-outline-success btn-tn">
                        <input ngbButton type="radio" value="middle"> Seguir
                    </label>
                </div>
            </div>
        </div>
    </div>
</ng-template>`,
    styles: [`a{
        text-decoration: none;
      }
      .img-circle {
        border-radius: 25px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.8rem;
        width: 2.8rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      
      .design_user {
        color:  #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.8rem;
        width: 2.8rem;
        border-radius: 50%;
        flex-shrink: 0;
        background-color: #4682B4;
        border-radius: 25px !important;
      }
      
      .image_pop{
        border: 1px solid #b7bec6;
      }
        
      .media{
        border: 1px solid cornsilk !important;
      }
      
      .primary-font{
      color: dimgrey;
        &:hover{
          color: darkgrey;
        }
      }
      `]
})
export class userDesignComponent {

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
            var names = name.split(' ');
            return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
        }
        return '';
    }
}