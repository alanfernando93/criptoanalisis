import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NewsService } from "../../../services/news.service";
import { HtmlParser } from "@angular/compiler";

@Component({
  selector: 'ngx-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgxModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  buttonsViews = [
    {
      title: "Default Buttons",
      key: "default"
    },
    {
      title: "Outline Buttons",
      key: "outline"
    }
  ];

  @Input() idNew: String = null;

  modalConten:NgxModalContent;
  newsPublish: any = {};
  contenido;

  selectedView = this.buttonsViews[0];

  constructor(
    private http: Http,
    private newsService: NewsService,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal 
  ) {
    this.modalConten = new NgxModalContent(this.activeModal);
  }

  ngOnInit() {
    if(localStorage.length != 0){
      this.newsService.setToken("?access_token="+localStorage.getItem("auth_app_token"));
      this.newsService.setUserId(localStorage.getItem("userId"));
    }
    if(this.idNew != null){
      this.newsService.getById(this.idNew).then(resp=>{
        this.newsPublish = resp;
        let parse = new DOMParser();
        this.contenido = this.newsPublish.contenido;
      });
    }
  }

  keyupHandlerFunction(event) {
    this.contenido = event;
  }

  onSave() {
    this.newsPublish.contenido = this.contenido;
    this.newsService.insertNews(this.newsPublish).then(resp => {
      this.router.navigate(['/']);
    });
  }

  open() {
    const modalRef = this.modalService.open(this.modalConten);
    modalRef.componentInstance.name = 'World';
  }
}
