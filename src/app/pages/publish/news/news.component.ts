import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from "../../news/news.service";
import { CoinsService } from "../../coins/coins.service";

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: "./croppermodal.component.html",
})
export class CropperModalContent {
  @Input() name;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;

  data: any;

  constructor(public activeModal: NgbActiveModal) {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;

      this.cropperSettings.width = 100;
      this.cropperSettings.height = 100;
      this.cropperSettings.croppedWidth = 100;
      this.cropperSettings.croppedHeight = 100;
      this.cropperSettings.canvasWidth = 400;
      this.cropperSettings.canvasHeight = 300;

      this.data = {};
  }

  fileChangeListener($event) {
      var image: any = new Image();
      var file: File = $event.target.files[0];
      var myReader: FileReader = new FileReader();
      var that = this;
      myReader.onloadend = function (loadEvent: any) {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);

      };

      myReader.readAsDataURL(file);
  }
}

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;
 
  @ViewChild('contentImag') content: TemplateRef<any>
  
  url = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
  myFile:File;
  closeResult: string;
  successMessage: string;
  type : String;
  newsPublish: any = {};
  coins: any = [];

  selectedView = {
    name: "Seleccione Moneda"
  };

  constructor(
    private modalService: NgbModal,
    private http: Http,
    private newsService: NewsService,
    private coinsService: CoinsService,
    private router: Router
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

  keyupHandlerFunction(event,opc) {
    switch(opc){
      case 'C':this.newsPublish.contenido = event;break;
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
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openCropper() {
    const modalRef = this.modalService.open(CropperModalContent);
    modalRef.componentInstance.name = 'World';
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

  readUrl(files) {
    console.log(files[0]);
    var type:any = new Array("image/jpeg","image/jpg","image/png","image/bmp");
    var maximo = 5500000; //4.8 Mb esto es para probar 
    //max y min 
    var img = new Image();
    if (files && files[0]) {
      this.myFile = files[0];
      // console.log(getimagesize(this.myFile));
      if (type.find(element => element === this.myFile.type) === undefined && this.myFile.size > maximo) return;

      var reader = new FileReader();
      
      reader.onload = (e:any) => {
        
        var imagen = new Image();
        imagen.src = e.target.result;
        console.log(imagen.height + 'px X ' + imagen.width + "px");
        this.url = e.target.result;
      }
      img.src = this.url
      reader.readAsDataURL(files[0]);
    }    
  }
}
