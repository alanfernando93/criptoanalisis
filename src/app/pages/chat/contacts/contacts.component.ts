import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { ChatService } from '../chat.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: any[];
  rooms: any[];
  requests: any[];
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
    this.chatService.getrequests().subscribe(data =>{
      this.requests = data.requests;
    });
  }
  chatRoom(Name: string,id:number){
    this.onChat.emit({
      nombre:Name,
      id: id
    });
  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  getStatus(id: number){
    if(id == parseInt(localStorage.getItem('userId')))
      return 'pendiente'
    else
    return 'solicitado'
  }
  ReqResponse(id: number, state: boolean){
    this.requests.forEach((element,index)=>{
      if(id == element.id){
        if(state){
          this.chatService.AcceptRequest(element.id).subscribe(data =>{
            console.log(data);
          });
        } else {
          this.chatService.RejectRequest(element.id).subscribe(data =>{
            console.log(data);
          });
        }
        this.requests.splice(index,1);
      }
    });
  }
}
