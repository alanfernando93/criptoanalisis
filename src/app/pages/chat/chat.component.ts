import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
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
  chatId : number;
  chatType: string;
  payMsg : boolean = false;
  chatName: string;
  rooms : any;
  showMsg: boolean = true;
  showRoom: boolean = true;
  constructor(private chatService : ChatService, private modalService: NgbModal) {}

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message =>{
      this.messages.push(message);
    });
    this.connection=this.chatService.getErrors().subscribe(message=>{
      this.messages.push(message);
    })
  }

  sendMsg(){
    if(this.chatId != undefined ){
      this.chatService.sendMessage(this.msg,this.chatId,this.chatType);
      this.msg ='';
    } else {
      this.chatService.sendMessage(this.msg,this.chatName,this.chatType);
      this.msg ='';
    }
  }
  ChatRoom(Room: any){
    if(this.chatName!=Room.nombre){
      this.ChatGen(Room);
      if(Room.id!=undefined){
        //flujo de chat personal
        this.chatService.findRequest(Room.id).subscribe(data=>{
          if(data.requests.length>0){
            this.closewindows(1);
            this.messages.push({message: 'tiene un chat gratuito disponible'});
          } else{
            this.closewindows(2);
          }
        });
        this.chatService.joinRoom(Room.id);
        this.getoldMessages(Room.id);
      } else {
        //flujo sala de chat
        this.chatService.joinRoom(this.chatName);
        this.getoldMessages(Room.nombre);
        this.closewindows(1);
      }
    }
  }
  //flujo general al cambiar de sala
  ChatGen(Room: any){
    if(this.chatId!=undefined){
      this.leave(this.chatId);
    }
    else{
      this.leave(this.chatName);
    }
    if(Room.id != undefined){
      this.chatId=Room.id;
    }
    this.chatName=Room.nombre;
    this.messages = [];
  }

  leave(room){
    this.chatService.leave(room);
      this.chatId=undefined;
  }
  setType(type: string){
      this.chatType= type;
      this.closewindows(1); 
  }
  getoldMessages(room: any){
    this.chatService.getoldMessages(room).subscribe(data =>{
      if(data.room != undefined)
        this.messages = data.room;
      else
        this.messages = data.messages;
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
  closewindows(x: number){
    switch(x){
      case 1:{
        this.showMsg=true;
        this.payMsg=false;
        break;
      }
      case 2:{ 
        this.showMsg=false;
        this.payMsg = true;
        break;
      }

    }
  }
  getuserId(){

    return localStorage.getItem('userId');
  }
  sendRequest(){
    this.chatService.CreateRequest(this.chatId).subscribe(data=>{
      console.log('peticion enviada');
    });
  }
  ngOnDestroy(){
    this.connection.unsubscribe();
  }

}
