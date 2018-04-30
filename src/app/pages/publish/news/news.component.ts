import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from "../../news/news.service";
import { CoinsService } from "../../coins/coins.service";

import { CropperModalComponent } from '../../../@theme/components/cropper/croppermodal.component';

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;
 
  titulo:String;
  
  url = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
  myFile:File;
  closeResult: string;
  newsPublish: any = {};
  coins: any = [];

  selectedView = {
    name: "Seleccione Moneda"
  };

  config: ToasterConfig;
  title = null;
  content = `I'm cool toaster!`;
  type = 'default';

  constructor(
    private modalService: NgbModal,
    private http: Http,
    private newsService: NewsService,
    private coinsService: CoinsService,
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    if (this.idNew != null) {
      this.newsService.getById(this.idNew).subscribe(resp => {
        this.newsPublish = resp;
      });
    }
    this.coinsService.getAll().subscribe(resp => {
      this.coins = resp;
    });
  }

  setContent(event,opc) {
    switch(opc){
      case 'C': this.newsPublish.contenido = event;break;
      case 'CP': this.newsPublish.conj_precio = event;break;
      case 'CM': this.newsPublish.conj_moneda = event;break;
    }
  }
 
  onSave() {
    console.log(this.newsPublish.contenido);
    this.newsPublish.tipo_moneda = this.selectedView.name;
    let body = new FormData();
    body.append('', this.myFile, 'perfil.png');
    this.newsService.insert(this.newsPublish).subscribe(resp => {
      this.newsService.imageFileUpload(resp.id,body).subscribe((r:Response) => {
      this.router.navigate(["/"]);
      })
    });    
  }

  open(content) {
    console.log(this.newsPublish);
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCropper() {
    const modalRef = this.modalService.open(CropperModalComponent);
    const instance = modalRef.componentInstance;
    modalRef.result.then(result => {
      if (instance.getImageResize()) {
        this.url = instance.getImageResize();
        this.myFile = instance.getImageFile();
      }
    }, reason => {
    })
  }
  
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return `with: ${reason}`;
      }
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'flyRight',
      limit: 5,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
