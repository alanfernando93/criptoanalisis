import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from "../../news/news.service";
import { CoinsService } from "../../coins/coins.service";

import { CropperModalComponent } from '../../../@theme/components/cropper/croppermodal.component';
import { async } from "@angular/core/testing";
import { showToast } from "../../../common/functions";
import { configCrud } from "../../../common/ConfigSettings";
import { DropboxCripto } from "../../../common/dropbox";

declare var tinymce: any;

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;

  url = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";

  myFile: File;
  content1: String;
  content2: String;
  content3: String;
  closeResult: string;
  newsPublish: any = {};
  coins: any = [];

  selectedView = {
    name: "Seleccione Moneda"
  };

  content = `I'm cool toaster!`;
  type = 'default';

  constructor(
    private modalService: NgbModal,
    private http: Http,
    private newsService: NewsService,
    private coinsService: CoinsService,
    private router: Router,
    private toasterService: ToasterService,
    private dropbox: DropboxCripto,
  ) { }

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

  refreshEditor1() {
    return new Promise(resolve => {
      setTimeout(() => {
        tinymce.editors[0].uploadImages(() => {
          this.newsPublish.contenido = tinymce.editors[0].getContent()
          resolve("get edito 1");
        })
      }, 1000);
    });
  }

  refreshEditor2() {
    return new Promise(resolve => {
      setTimeout(() => {
        tinymce.editors[1].uploadImages(() => {
          this.newsPublish.conj_precio = tinymce.editors[1].getContent()
          resolve('get edito 2');
        })

      }, 1000);
    });
  }

  refreshEditor3() {
    return new Promise(resolve => {
      setTimeout(() => {
        tinymce.editors[2].uploadImages(() => {
          this.newsPublish.conj_moneda = tinymce.editors[2].getContent()
          resolve("get edito 3");
        })
      }, 1000);
    });
  }

  async onSave() {
    var uno = await this.refreshEditor1();
    var dos = await this.refreshEditor2();
    var tres = await this.refreshEditor3();
    this.newsPublish.tipo_moneda = this.selectedView.name;
    // let body = new FormData();
    // body.append('', this.myFile, 'perfil.png');
    this.newsService.insert(this.newsPublish).subscribe(resp => {
      // this.newsService.imageFileUpload(resp.id, body).subscribe((r: Response) => {
      //   this.router.navigate(["/pages/news/list"]);
      // })
      this.dropbox.imageUploadDropbox(this.myFile, this.newsService.getUserId(), 'news', 'perfil-' + resp.id).then(resp => {
        this.type = 'success'
        this.content = configCrud.message.success + ' noticias';
        showToast(this.toasterService, this.type, this.content);
        this.router.navigate(["/pages/news/list"]);
      });
    }, error => {
      this.type = 'error'
      this.content = configCrud.message.error + ' noticias';
      showToast(this.toasterService, this.type, this.content);
    });
  }

  open(content) {
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
}
