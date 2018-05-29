import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ngx-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class commentComponent {

  @Output() onObject = new EventEmitter<any>();

  @Input() coment: any = [];
  @Input() fama: any;
  @Input() answer: any;

  constructor() {
    moment.locale('es');
  }
  onAnswer($event) {
    var input = $event.target.closest(".panel-footer").firstElementChild.firstElementChild;
    let data = {
      id: input.id,
      name: input.name,
      value: input.value
    };
    input.value = "";
    this.onObject.emit(data);
  }

}

