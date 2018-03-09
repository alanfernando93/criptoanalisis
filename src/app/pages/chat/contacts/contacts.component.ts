import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { ChatService } from '../chat.service';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: any[];
  rooms: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  @Output() onChat = new EventEmitter();

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private chatService : ChatService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit() {
    this.getChats();
  }
  getChats(){
    this.chatService.getrooms().subscribe(data =>{
      this.rooms = data;
    });
    this.chatService.getUsers().subscribe(data =>{
      this.contacts = data;
    });
  }
  chatRoom(Room: string){
    this.onChat.emit(Room);
    console.log('cambiando chat',Room);
  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
