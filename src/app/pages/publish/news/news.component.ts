import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from "../../news/news.service";
import { CoinsService } from "../../coins/coins.service";

@Component({
  selector: "ngx-publish-news",
  styleUrls: ["./news.component.scss"],
  templateUrl: "news.component.html"
})
export class PublishNewsComponent implements OnInit {
  @Input() idNew: String = null;

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
    var img = new Image();
    if (files && files[0]) {
      this.myFile = files[0]
      var reader = new FileReader();
      
      reader.onload = (e:any) => {
        this.url = e.target.result;
      }
      img.src = this.url
      reader.readAsDataURL(files[0]);
    }    
  }
}
