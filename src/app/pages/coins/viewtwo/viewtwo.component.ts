import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { Session } from '../../../@core/data/session';
import { CoinsService } from '../coins.service';
import { UserService } from '../../../@core/data/users.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'undefined-viewtwo',
  templateUrl: './viewtwo.component.html',
  styleUrls: ['./viewtwo.component.scss']
})
export class ViewtwoComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: TemplateRef<any>
  select: Number = parseInt(Session.getStorage('select'));
  titleContent: any;

  titleSelected: any;

  monedaId = 2;

  titles: any;
  constructor(
    private coinsService: CoinsService,
    private userService: UserService,
    private modalService: NgbModal,
  ) { moment.locale('es'); }

  ngOnInit() {
    let filter = [
      "filter[where][monedaId]=" + this.monedaId
    ]
    this.coinsService.getTitleConclusion(35, filter.join('&')).subscribe(data => {
      data.forEach((element, value) => {
        this.userService.getById(element.usuarioId).subscribe(resp => element.user = resp)
      });
      this.titleContent = data
    });
  }

  SelectAccordion(selected) {
    let collectionButtons: any = document.getElementById(selected.panelId + '-header').closest('ngb-accordion').querySelectorAll('button');
    collectionButtons.forEach(element => element.remove());
    let btn1 = document.createElement('input');
    btn1.setAttribute('class', 'btn btn-primary btn-tn pull-right');
    btn1.setAttribute('type', 'button');
    
    btn1.value = "Ir";
    let btn2 = document.createElement('input');
    btn2.setAttribute('class', 'btn btn-primary btn-tn pull-right');
    btn2.setAttribute('type', 'hidden');
    btn2.onclick = (btn) => {
      let bt = <HTMLButtonElement>btn.target;
      bt.setAttribute('type','hidden');
      btn3.setAttribute('type','button');
      let content = <Element>bt.closest('.card').querySelector('div[id="'+selected.panelId+'"]').firstElementChild;
      content.removeAttribute('style');
      content.setAttribute('contenteditable',"false");
    }
    btn2.value = "Guardar";
    let btn3 = document.createElement('input');
    btn3.setAttribute('class', 'btn btn-primary btn-tn pull-right');
    btn3.setAttribute('type', 'button');
    btn3.onclick = (btn) => {
      let bt = <HTMLButtonElement>btn.target;
      bt.setAttribute('type','hidden');
      btn2.setAttribute('type','button');
      let content = bt.closest('.card').querySelector('div[id="'+selected.panelId+'"]').firstElementChild;
      content.setAttribute('style','background-color: bisque;')
      content.setAttribute('contenteditable',"true");
    }
    btn3.value = "Editar";
    if (selected.nextState === true) {
      document.getElementById(selected.panelId + '-header').appendChild(btn3);
      document.getElementById(selected.panelId + '-header').appendChild(btn2);
      document.getElementById(selected.panelId + '-header').appendChild(btn1);
    }
  }

  ngOnDestroy() {
    this.select = 1
    Session.removeStorage('select');
  }

  Select($event) {
    Session.setStorage('select', $event.nextId)
  }

  open(userId) {
    let filter = [
      "filter[where][monedaId]=" + this.monedaId,
      "filter[where][usuarioId]=" + userId
    ]
    this.titleSelected = userId;
    this.coinsService.getTitle().subscribe(data => {
      this.titles = data.filter(item => item.correspondencia == null);
      this.titles.forEach(element => {
        delete element.correspondencia;
        delete element.enlace;
        delete element.pregunta;
        element.subtitles = data.filter(obj => {
          if (obj.correspondencia == element.id) {
            this.coinsService.getTitleConclusion(obj.id, filter.join('&')).subscribe(resp => {
              obj.contenido = resp.length > 0 ? resp[0].contenido : "";
            });
            delete obj.correspondencia;
            return obj;
          }
        });
        element.isCollapsed = true;
      });
    })
    this.modalService.open(this.content, { size: 'lg' }).result.then((result) => {
    }, (reason) => { });
  }
}
