import { Component, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NewsService } from '../../../pages/news/news.service';

@Component({
    selector: 'ngx-denuncia',
    templateUrl: './denuncia.component.html',
    styleUrls: ['./denuncia.component.scss']
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