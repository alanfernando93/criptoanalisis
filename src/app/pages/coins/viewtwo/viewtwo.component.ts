import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '../../../@core/data/session';

@Component({
  selector: 'undefined-viewtwo',
  templateUrl: './viewtwo.component.html',
  styleUrls: ['./viewtwo.component.scss']
})
export class ViewtwoComponent implements OnInit, OnDestroy {

  select: Number = parseInt(Session.getStorage('select'));

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.select = 1
    Session.removeStorage('select');
  }
  Select($event) {
    Session.setStorage('select', $event.nextId)
  }
}
