import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ngx-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {

  @Output() onObject = new EventEmitter<any>();

  @Input() coment: any = [];
  @Input() fama: any;
  @Input() answer: any;

  constructor(
    private router: Router,
  ) {
    moment.locale('es');
  }
  onAnswer($event) {
    const input = $event.target.closest('.panel-footer').firstElementChild.firstElementChild;
    const data = {
      id: input.id,
      name: input.name,
      value: input.value,
    };
    input.value = '';
    this.onObject.emit(data);
  }

  signin() {
    this.router.navigate(['/auth/login']);
  }

}

