import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '../../../@core/data/session';
import { CoinsService } from '../coins.service';
import { UserService } from '../../../@core/data/users.service';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';

@Component({
  selector: 'undefined-viewtwo',
  templateUrl: './viewtwo.component.html',
  styleUrls: ['./viewtwo.component.scss']
})
export class ViewtwoComponent implements OnInit, OnDestroy {

  select: Number = parseInt(Session.getStorage('select'));
  titleContent:any;

  constructor(
    private coinsService:CoinsService,
    private userService: UserService,
  ) { moment.locale('es'); }

  ngOnInit() {
    this.coinsService.getTitleConclusion(35).subscribe(data => {
      data.forEach((element,value) => {
        this.userService.getById(element.usuarioId).subscribe(resp => element.user = resp)
      });
      this.titleContent = data
      console.log(this.titleContent);      
    });
  }

  ngOnDestroy() {
    this.select = 1
    Session.removeStorage('select');
  }
  
  Select($event) {
    Session.setStorage('select', $event.nextId)
  }
}
