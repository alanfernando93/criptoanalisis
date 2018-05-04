import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


// import { NewsService } from "../../../services/news.service";

// import { CoinsService } from "../../../services/coins.service";
import { AdvisoriesService } from "../../advisories/advisories.service";
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: "ngx-publish-advisories",
  styleUrls: ["./advisory.component.scss"],
  templateUrl: "advisory.component.html"
})

export class AdvisoryComponent implements OnInit {
    @Input() idNew: String = null;
    selectedView = {
      name: "Seleccione tema"
    };  
    coins: any = [];
       tipoSignal = {
      title: 'selecione el tema',
      key: true,
    }
    
    advisororiesPublish: any = {};
    words2 = [{value: 'tema 1'}];
    
    id1:boolean;
    id2:boolean;
    id3:boolean;
    id4:boolean;
    

    mod1:boolean;
    mod2:boolean;
    tipos = [{
      title: 'trading',
      key: true,
    }, {
      title: 'mineria',
      key: false,
    },
    {
      title: 'solidity',
      key: true,
    }
  ]
  

  idiomas = [];
  modalidad = [];
  temas = [];
  
    advisoriesPublish: any = {};
    closeResult: string;
    config: ToasterConfig
    title = null;
    content = `I'm cool toaster!`;
    type = 'default';
  
        constructor(
      private modalService: NgbModal,
      private http: Http,
      private advisoriesService: AdvisoriesService,
      private toasterService: ToasterService,
      private router: Router
      
    ) {}
  
    ngOnInit() {
      if (this.idNew != null) {
        this.advisoriesService.getAdvisoriesId(this.idNew).subscribe(resp => {
          this.advisoriesPublish = resp;
        });
      }
      
    }

    keyupHandlerFunction(event,opc) {
      switch(opc){
        case 'C':this.advisoriesPublish.ventajas_adicionales = event;break;
        case 'T':this.advisoriesPublish.contenido_asesoria = event;break;
        case 'Ter':this.advisoriesPublish.terminos_coach = event;break;
        
      }
    }

    onSave() {
      this.type = 'success'
        this.content = 'Se creao la asesoria con exito!!!'
        this.showToast(this.type, this.title, this.content);
      this.advisoriesPublish.tematica = this.tipoSignal.title;
      this.advisoriesPublish.ubicacion = "lapaz";
      for(var i=0;i<this.words2.length;i++)
      {
        this.temas.push(this.words2[i].value)
        console.log("holas"+this.words2[i].value)
        console.log(typeof this.words2[i].value)

      }

             
      this.advisoriesPublish.temas_asesoria=this.temas;
      if(this.id1)
      {
        this.idiomas.push("español");
        console.log(this.id1)     
      }
      if(this.id2)
      {
        this.idiomas.push("ingles");
        console.log(this.id2)
      }
      if(this.id3)
      {
        this.idiomas.push("aleman");
        console.log(this.id3)
      }
      if(this.id4)
      {
        this.idiomas.push("frances");
        console.log(this.id4)
      }
      if(this.mod1)
      {
          this.modalidad.push("virtual");
      }
      if(this.mod2)
      {
        this.modalidad.push("presencial");
      }
        


      this.advisoriesPublish.idiomas=this.idiomas
      this.advisoriesPublish.modalidad=this.modalidad;
      let body = new FormData();
      console.log(this.advisoriesPublish)
      this.advisoriesService.insert(this.advisoriesPublish).subscribe(resp => {
        this.router.navigate(['/pages/advisories/list']);
      });
      
      
    }
    open(content) {
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
  
