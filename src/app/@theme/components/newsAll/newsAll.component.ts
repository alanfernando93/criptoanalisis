import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'ngx-newsAll',
    template: `<div class="container">
    <div class="row">
      <div class="{{design}}" *ngFor="let news of listNews">
        <nb-card>
          <div class="thumbnail img-thumb-bg">
            <img src="{{news.perfilLink}}" class="img-fluid img-thumb-bg">
            <div class="overlay"></div>
            <div class="caption">
              <div class="tag">
                <a href="#">{{news.tipo_moneda}}</a>
                <a href="#" class="pull-right" *ngIf="precision > pagado else free">De pago</a>
              <ng-template #free>
                  <a href="#" class="pull-right">Oferta</a>  
              </ng-template>
              </div>
              <div class="title">
                <a [routerLink]="['/pages/news/news-view', news.id]">{{news.titulo}}</a>
              </div>
              <div class="clearfix">
                <span class="meta-data">{{news.fecha_create | amTimeAgo}}</span>
                <span class="meta-data pull-right">
                  <a>
                    <i class="fa fa-thumbs-o-down"></i>{{news.dislikes.total}}</a>
                </span>
                <span class="meta-data pull-right">
                  <a>
                    <i class="fa fa-thumbs-o-up"></i>{{news.likes.total}}</a>
                </span>
                <span class="meta-data pull-right" *ngFor="let count of news.count">
                  <a>
                    <i class="fa fa-comment-o"></i>{{count.count}}</a>
                </span>
              </div>
              <div class="content" *ngFor="let dataUser of news.contentUser">
                <div>
                  <span class="spn-data badge badge-primary pull-right" *ngFor="let famaUser of dataUser.fama.firstTwo">{{famaUser.valor}} {{famaUser.symbol}}</span>
                  <nb-user class="col-6 col-md-6 meta-data" [name]="dataUser?.username" [picture]="dataUser?.perfil"></nb-user>
                </div>
              </div>
            </div>
          </div>
        </nb-card>
      </div>
    </div>
  </div>`,
    styles: [`body {
        padding: 10px 0;
        background-color: #f4f4f4;
        font-family: 'Montserrat', sans-serif;
      }
      a {
        text-decoration: none;
        transition: all 0.3s ease-in-out;
      }
      a:hover,
      a:focus,
      a:active {
        text-decoration: none;
      }
      .btn.btn-lg {
        padding: 6px 30px;
      }
      .thumbnail-title {
        font-size: 20px;
        margin-top: 5px;
      }
      .img-thumb-bg {
        padding: 0;
        overflow: hidden;
        min-height: 200px;
        position: relative;
        border-radius: 3px;
        background-position: center;
        background-color: transparent;
        width: 100%;
      }
      .img-thumb-bg p {
        color: #fff;
        margin-bottom: 0;
        line-height: 16px;
      }
      .img-thumb-bg .overlay {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        transition: all 0.3s ease-in-out;
        background: rgba(0, 0, 0, 0);
        background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
        background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
        background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, #000000 100%);
        background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 50%, #000000 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(50%, rgba(0, 0, 0, 0)), color-stop(100%, #000000));
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000', endColorstr='#000000', GradientType=0);
      }
      .img-thumb-bg .caption {
        bottom: -5px;
        height: 110px;
        font-size: 12px;
        position: absolute;
        padding: 0 20px 20px;
        width: 100%;
        transition: all 0.3s ease-in-out;
      }
      .img-thumb-bg .caption .tag a {
        color: #fff;
        padding: 0 5px;
        font-size: 12px;
        border-radius: 2px;
        display: inline-block;
        background-color: #2980B9;
      }
      .img-thumb-bg .caption .title {
        margin-top: 5px;
        font-size: 18px;
        line-height: 20px;
        text-transform: uppercase;
        height: 60px;
        overflow: hidden;
      }
      .img-thumb-bg .caption .title a {
        color: #fff;
      }
      .img-thumb-bg .caption .title a:hover {
        color: #2980B9;
      }
      .img-thumb-bg .caption .meta-data {
        color: #ffffff;
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 15px;
        padding-right: 5px;
      }
      .img-thumb-bg .caption .meta-data a {
        color: #777;
      }
      .img-thumb-bg .caption .meta-data a .fa {
        color: #2980B9;
      }
      .img-thumb-bg .caption .meta-data a:hover {
        color: #2980B9;
      }
      .img-thumb-bg .caption .content {
        display: none;
        width: 100%;
      }
      .img-thumb-bg:hover .overlay {
        background: rgba(46, 49, 58, 0.8);
      }
      .img-thumb-bg:hover .caption {
        bottom: 60px;
      }
      .img-thumb-bg:hover .caption .content {
        display: block;
      }
      .spn-data{
        margin-top: 12px;
        margin-right: 2px;
      }`]
})
export class newsAllComponent {

    @Input() listNews: any;
    @Input() design: any;
    @Input() precision: any;

    pagado: number = 50;

    constructor(){
        moment.locale('es');
    }
}