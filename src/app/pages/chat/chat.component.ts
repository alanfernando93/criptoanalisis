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
  users =[];
 chatId : string;
  rooms : any;
  showMsg: boolean = true;
  showRoom: boolean = true;
  constructor(private chatService : ChatService, private modalService: NgbModal) {}

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message =>{
      this.messages.push(message);
    });
  }

  sendMsg(msg){
     this.chatService.sendMessage(msg,this.chatId);
     console.log(msg)
     this.msg ='';
  }
  ChatRoom(Room: string){
    if(this.chatId!=Room){
      this.leave(this.chatId);
      this.chatId= Room;
      this.chatService.join(this.chatId);
      this.messages = [];
      this.getoldMessages(Room);
      console.log('uniendo a sala: ', this.chatId);
      }
  }

  leave(room){
    this.chatService.leave(this.chatId);
    console.log('sala abandonada', this.chatId);
    this.chatId="";
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
