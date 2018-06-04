import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { Response } from "@angular/http";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from "../../news/news.service";
import { CoinsService } from "../../coins/coins.service";

// import { CropperModalComponent } from '../../../@theme/components/cropper/croppermodal.component';

import { async } from "@angular/core/testing";
import { showToast } from "../../../common/functions";
import { configCrud } from "../../../common/ConfigSettings";
import { DropboxCripto } from "../../../common/dropbox";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

declare var tinymce: any;

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;  

  myFile:any;
  content1: String;
  content2: String;
  content3: String;
  closeResult: string;
  newsPublish: any = {};
  coins: any = [];
  Form: FormGroup

  selectedView = {
    name: "Seleccione Moneda"
  };

  content = `I'm cool toaster!`;
  type = 'default';

  constructor(
    private modalService: NgbModal,
    private newsService: NewsService,
    private coinsService: CoinsService,
    private router: Router,
    private toasterService: ToasterService,
    private dropbox: DropboxCripto,
    private fb: FormBuilder
  ) { this.Form = this.fb.group({
    title: ['', Validators.compose([Validators.required, Validators.minLength(4) ])]
  }) }

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
    this.newsService.insert(this.newsPublish).subscribe(resp => {
      this.dropbox.imageUploadDropbox(this.myFile, this.newsService.getUserId(), 'news', 'perfil-' + resp.id).then(resp => {
        this.content = configCrud.message.success + ' noticias';
        showToast(this.toasterService, 'success', this.content);
        this.router.navigate(["/pages/news/news-list"]);
      });
    }, error => {
      this.content = configCrud.message.error + ' noticias';
      showToast(this.toasterService, 'error', this.content);
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
