import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { Response } from "@angular/http";

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from "../../news/news.service";
import { CoinsService } from "../../coins/coins.service";

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

  myFile: any;
  content1: String;
  content2: String;
  content3: String;
  closeResult: string;
  newsPublish: any = {};
  coins: any = [];
  Form: FormGroup

  isPreload: boolean = false;

  selectedView = {
    name: "Seleccione Moneda"
  };

  content = `I'm cool toaster!`;
  type = 'default';

  editor1: Promise<any>;
  editor2: Promise<any>;
  editor3: Promise<any>;

  constructor(
    private modalService: NgbModal,
    private newsService: NewsService,
    private coinsService: CoinsService,
    private router: Router,
    private toasterService: ToasterService,
    private dropbox: DropboxCripto,
    private fb: FormBuilder
  ) {
    this.Form = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    })
  }

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

  onSave(event) {
    this.isPreload = true;
    this.editor1 = new Promise(resolve => {
      tinymce.editors[0].uploadImages(() => {
        this.newsPublish.contenido = tinymce.editors[0].getContent()
        resolve("get edito 1");
      })
    });

    this.editor2 = new Promise(resolve => {
      tinymce.editors[1].uploadImages(() => {
        this.newsPublish.conj_precio = tinymce.editors[1].getContent()
        resolve('get edito 2');
      })
    });

    this.editor3 = new Promise(resolve => {
      tinymce.editors[2].uploadImages(() => {
        this.newsPublish.conj_moneda = tinymce.editors[2].getContent()
        resolve("get edito 3");
      })
    });
    Promise.all([this.editor1, this.editor2, this.editor3]).then(values => {
      this.newsPublish.tipo_moneda = this.selectedView.name;
      this.newsService.insert(this.newsPublish).subscribe(resp => {
        this.dropbox.imageUploadDropbox(this.myFile, this.newsService.getUserId(), 'news', 'perfil-' + resp.id).then(resp => {
          this.isPreload = false;
          this.content = configCrud.message.success + ' noticias';
          showToast(this.toasterService, 'success', this.content);
          this.router.navigate(["/pages/news/news-list"]);
        });
      }, error => {
        this.isPreload = false;
        this.content = configCrud.message.error + ' noticias';
        showToast(this.toasterService, 'error', this.content);
      });
    })

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
