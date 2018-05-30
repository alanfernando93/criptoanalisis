import { Component, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NewsService } from '../../../pages/news/news.service';

@Component({
    selector: 'ngx-denuncia',
    template: `<div class="Design">
    <a class="btn btn-outline-secondary pull-right btn-tn" placement="left" [ngbPopover]="popContentDenuncia" popoverTitle="Tipo de Denuncia">
        denunciar
    </a>
    <ng-template #popContentDenuncia>
        <div class="row">
            <div class="col-md-12">
                <div class="demo-radio col-md-10">
                    <label class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" [(ngModel)]="denuncia.tipo" value="1">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">la {{tipCom}} es falsa</span>
                    </label>
                    <label class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" [(ngModel)]="denuncia.tipo" value="2">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">el contenido es inapropiado</span>
                    </label>
                    <label class="custom-control custom-radio" *ngIf="Content">
                        <input type="radio" class="custom-control-input" [(ngModel)]="denuncia.tipo" value="3">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">{{Content}}</span>
                    </label>
                </div>
                <form>
                    <div class="form-group">
                        <h6 class="text-body">Comentario</h6>
                        <textarea class="form-control" #contenido="ngModel" name="contenido" [(ngModel)]="denuncia.comentario" placeholder="Escribe un Comentario"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-tn pull-right" (click)="sendDenuncia()">Denunciar</button>
                </form>
            </div>
        </div>
    </ng-template>
</div>`
})
export class denunciaComponent {

    @Input() Design: any;
    @Input() tipCom: any;
    @Input() Content: any;
    @Input() userIdNews: any; 
    @Input() newsId: any;
    @Input() nalugar: any;
    denuncia: any = {};
    
    constructor(
        private newsService: NewsService
    ){
    }

    sendDenuncia() {
        this.denuncia.lugar = this.nalugar;
        this.denuncia.lugarId = this.newsId;
        this.denuncia.denunciadoId = this.userIdNews;
        this.newsService.postDenuncias(this.denuncia).subscribe(data => {
          this.denuncia = {};
        });
      }
    
}