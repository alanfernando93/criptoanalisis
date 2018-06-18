import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Session } from '../../../@core/data/session';
import { CoinsService } from '../coins.service';
import { UserService } from '../../../@core/data/users.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'undefined-viewtwo',
  templateUrl: './viewtwo.component.html',
  styleUrls: ['./viewtwo.component.scss'],
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
    const filter = [
      'filter[where][monedaId]=' + this.monedaId,
    ]
    this.coinsService.getTitleConclusion(35, filter.join('&')).subscribe(data => {
      data.forEach((element, value) => {
        this.userService.getById(element.usuarioId).subscribe(resp => element.user = resp)
      });
      this.titleContent = data
    });
  }

  SelectAccordion(selected) {
    const collectionButtons: any = document.getElementById(selected.panelId + '-header').closest('ngb-accordion').querySelectorAll('input');
    collectionButtons.forEach(element => element.remove());
    const btn1 = document.createElement('input');
    btn1.setAttribute('class', 'btn btn-primary btn-tn');
    btn1.setAttribute('type', 'button');

    btn1.value = 'Nuevo';
    const btn2 = document.createElement('input');
    btn2.setAttribute('class', 'btn btn-primary btn-tn');
    btn2.setAttribute('type', 'button');
    btn2.onclick = (btn) => {
      const bt = <HTMLInputElement>btn.target;
      const content = <Element>bt.closest('.card').querySelector('div[id="' + selected.panelId + '"]').firstElementChild;
      if (bt.value === 'Editar') {
        bt.value = 'Sugerir';
        content.setAttribute('style', 'background-color: bisque;')
        content.setAttribute('contenteditable', 'true');
      } else {
        bt.value = 'Editar';
        content.removeAttribute('style');
        content.setAttribute('contenteditable', 'false');
      }
    }
    btn2.value = 'Editar';
    if (selected.nextState === true) {
      const div = document.createElement('div');
      div.setAttribute('class', 'btn-group btn-group-toggle pull-right');
      div.appendChild(btn1);
      div.appendChild(btn2);
      document.getElementById(selected.panelId + '-header').appendChild(div);
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
    const filter = [
      'filter[where][monedaId]=' + this.monedaId,
      'filter[where][usuarioId]=' + userId,
    ]
    this.titleSelected = userId;
    this.coinsService.getTitle().subscribe(data => {
      this.titles = data.filter(item => item.correspondencia == null);
      this.titles.forEach(element => {
        delete element.correspondencia;
        delete element.enlace;
        delete element.pregunta;
        element.subtitles = data.filter(obj => {
          if (obj.correspondencia === element.id) {
            this.coinsService.getTitleConclusion(obj.id, filter.join('&')).subscribe(resp => {
              obj.contenido = resp.length > 0 ? resp[0].contenido : '';
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
