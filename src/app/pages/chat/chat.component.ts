import { Component, OnInit } from '@angular/core';
import { ChatService} from './chat.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers:[ ChatService ]
})
export class ChatComponent implements OnInit {

  msg : string;
  messages = [];
  connection;
  roomId : string;
  rooms : any;
  showMsg: boolean = true;
  showRoom: boolean = true;
  constructor(private chatService : ChatService, private modalService: NgbModal) {}

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message =>{
      this.messages.push(message);
    });
    this.getrooms();
  }

  sendMsg(msg){
     this.chatService.sendMessage(msg,this.roomId);
     console.log(msg)
     this.msg ='';
  }
  join(room){
    if(this.roomId!=room){
    this.leave(this.roomId);
    this.roomId= room;
    this.chatService.join(this.roomId);
    this.messages = [];
    this.getoldMessages(room);
    console.log('uniendo a sala: ', this.roomId);
    }
  }

  leave(room){
    this.chatService.leave(this.roomId);
    console.log('sala abandonada', this.roomId);
    this.roomId="";
  }

  getrooms(){
    this.chatService.getrooms().subscribe(data =>{
      this.rooms = data;
    })
  }

  getoldMessages(room:string){
    this.chatService.getoldMessages(room).subscribe(data =>{
      this.messages = data.room;
      console.log(data);
    })
  }
  changeView(){
    if(this.showMsg){
      this.showMsg=false;
      this.showRoom=true;
    }
    else{
      if(this.showRoom){
        this.showRoom=false;
        this.showMsg=true;
      }
    }
  }
  showMobile(){
    if(this.showRoom && this.showMsg){
    }
    else {
      this.showMsg=!this.showMsg;
      this.showRoom=!this.showRoom;
    }
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }

}
