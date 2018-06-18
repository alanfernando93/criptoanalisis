import { Component, Input } from '@angular/core';
import { NewsService } from '../../../pages/news/news.service';

@Component({
    selector: 'ngx-complaint',
    templateUrl: './complaint.component.html',
})
export class ComplaintComponent {

    @Input() Design: any;
    @Input() tipCom: any;
    @Input() Content: any;
    @Input() userIdNews: any;
    @Input() newsId: any;
    @Input() nalugar: any;
    denuncia: any = {};

    constructor(
        private newsService: NewsService,
    ) {
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
