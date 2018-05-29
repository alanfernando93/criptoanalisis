import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'ngx-signalAll',
    template: `<!-- <div class="container d-block d-sm-none">
    <div class="row">
        <div class="col-7">
            <nb-card>
                <div class="dropdown" ngbDropdown>
                    <button class="btn btn-primary btn-tn" type="button" ngbDropdownToggle>
                        mas recientes
                    </button>
                    <ul class="dropdown-menu" ngbDropdownMenu>
                        <li class="dropdown-item">Icon Button 2</li>
                        <li class="dropdown-item">Hero Button</li>
                        <li class="dropdown-item">Default</li>
                    </ul>
                </div>
            </nb-card>
        </div>
        <div class="col-5">
            <nb-card>
                <div class="dropdown" ngbDropdown>
                    <button class="btn btn-primary btn-tn" type="button" ngbDropdownToggle>
                        btn mon
                    </button>
                    <ul class="dropdown-menu" ngbDropdownMenu>
                        <li class="dropdown-item">Icon</li>
                        <li class="dropdown-item">Hero</li>
                        <li class="dropdown-item">Defau</li>
                    </ul>
                </div>
            </nb-card>
        </div>
    </div>
</div> -->
<div class="row mb-5">
    <div class="col-sm-6 col-md-4 mt-4" *ngFor="let signal of listSignal">
        <nb-card>
            <div class="card card-inverse card-info">
                <a [routerLink]="['/pages/signals/signals-view', signal.id]">
                    <img class="card-img-top d-none d-sm-block" src="{{signal.perfilLink}}">
                    <div class="card-block" *ngFor="let content of signal.contentUser">
                        <div class="row">
                            <nb-user class="col-6 col-md-7" [menu]="" [name]="content?.username" [picture]="content?.perfil"></nb-user>
                            <h5 class="col-3 col-md-3">
                                <span class="badge badge-secondary user">{{content.puntos}} P</span>
                            </h5>
                            <h5 class="col-3 col-md-2">
                                <span class="badge badge-secondary user">{{content.fidelidad}} F</span>
                            </h5>
                        </div>
                        <div class="card-text-5 row" *ngFor="let content of signal.contentUser">
                            <div class="col-5 col-md-5 pago">
                                <span class="text-hint" *ngIf="content.precision.valor > pagado else free">
                                    De pago
                                </span>
                            </div>
                            <ng-template #free>
                                <span class="text-hint">
                                    Gratis
                                </span>
                            </ng-template>
                            <div class="col-6 col-md-6">
                                <span class="text-hint pull-right">
                                    {{signal.moneda1}} / {{signal.moneda2}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <small class="col-6 col-md-6 sp_size text-hint">{{signal.FechaCreate | amTimeAgo:true}}</small>
                            <span class="col-2 col-md-2" *ngFor="let count of signal.count">
                                <i class="fa fa-comment-o">{{count.count}}</i>
                            </span>
                            <span class="col-2 col-md-2">
                                <i class="fa fa-thumbs-up up">{{signal.likes.total}}</i>
                            </span>
                            <span class="col-2 col-md-2">
                                <i class="fa fa-thumbs-down down">{{signal.dislikes.total}}</i>
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        </nb-card>
    </div>
</div>`,
    styles: [`html {
        font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-size: 14px;
    }
    
    h5 {
        font-size: 1.28571429em;
        font-weight: 700;
        line-height: 1.2857em;
        margin: 0;
    }
    
    .card {
        font-size: 1em;
        overflow: hidden;
        padding: 0;
        border: none;
        border-radius: .28571429rem;
        box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    }
    
    .card-block {
        font-size: 1em;
        position: relative;
        margin: 0;
        padding: 1em;
        border: none;
        border-top: 1px solid rgba(34, 36, 38, .1);
        box-shadow: none;
    }
    
    .card-img-top {
        display: block;
        width: 100%;
        height: auto;
    }
    
    .card-title {
        font-size: 1.28571429em;
        font-weight: 700;
        line-height: 1.2857em;
    }
    
    .card-text {
        clear: both;
        margin-top: .5em;
        color: rgba(0, 0, 0, .68);
    }
    
    .card-footer {
        font-size: 1em;
        position: static;
        top: 0;
        left: 0;
        max-width: 100%;
        padding: .75em 1em;
        color: rgba(0, 0, 0, .4);
        border-top: 1px solid rgba(0, 0, 0, .05) !important;
        background: #fff;
    }
    
    .card-inverse .btn {
        border: 1px solid rgba(0, 0, 0, .05);
    }
    
    .profile {
        position: absolute;
        top: -12px;
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        width: 25px;
        height: 25px;
        margin: 0;
        border: 1px solid #fff;
        border-radius: 50%;
    }
    
    .profile-avatar {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 50%;
    }
    
    .profile-inline {
        position: relative;
        top: 0;
        display: inline-block;
    }
    
    .profile-inline ~ .card-title {
        display: inline-block;
        margin-left: 4px;
        vertical-align: top;
    }
    
    .text-bold {
        font-weight: 700;
    }
    
    .meta {
        font-size: 1em;
        color: rgba(0, 0, 0, .4);
    }
    
    .meta a {
        text-decoration: none;
        color: rgba(0, 0, 0, .4);
    }
    
    .meta a:hover {
        color: rgba(0, 0, 0, .87);
    }
    
    .card-text-5 {
        padding-top: 1.5rem !important;
    }
    .user {
        margin-top: 0.64rem;
        margin-right: 1.3rem;
    }
    .pago {
        margin-right: 22px;
    }`]
})
export class signalAllComponent {

    @Input() listSignal: any;
    @Input() design: any;

    pagado: number = 50; 

    constructor(){
        moment.locale('es');
    }

}