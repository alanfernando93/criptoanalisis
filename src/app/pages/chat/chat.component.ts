import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ChatService} from './chat.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers:[ ChatService ]
})
export class ChatComponent implements OnInit {
  /**
   * variables
   * contactos : variables para los contactos
   * msg : el mensaje que se emitira
   * connection: variable de conexion para el socket
   * chatType: pay o free dependiendo de la configuracion
   * rooms : variable para guardar las salas de chat de monedas
   * closeResult: cerrar popovers
   * reciever : es el sujeto del chat
   * freechat : id del la solicitud de chat gratuito
   */
  modalRef: NgbModalRef;
  contacts = [];
  msg : string;
  messages = [];
  connection;
  chatType: string;
  payMsg : boolean = false;
  rooms : any;
  closeResult: string;
  reciever: any;
  freechat : number;
  constructor(private chatService : ChatService, private modalService: NgbModal) {}

  ngOnInit() {
    this.reciever = {
      id: undefined,
      name: undefined,
      type: undefined,
      picture: undefined
    };
    this.getchats();
    this.connection = this.chatService.getMessages().subscribe(message =>{
      this.messages.push(message);
    });
    this.connection=this.chatService.getErrors().subscribe(message=>{
      this.messages.push(message);
    })
  }
  getchats(){
    this.chatService.getUsers().subscribe(data =>{
      this.contacts = data;
    });
  };
  // se conecta al usuario y deja la anterios sala
  openUser(id, name, type, picture, content){
    //dejamos la sala anterior y nos unimos a la nueva
    if((this.reciever.id== id && this.reciever.type != type) || (this.reciever.id!= id && this.reciever.type == type) || this.reciever.id == undefined) {
      if(this.reciever) {
        if(this.reciever.type == 'person')
          this.chatService.leave(id)
        else
          this.chatService.leave(name)
      }
      this.messages=[];
      this.reciever = {
          id: id,
          name: name,
          picture: picture,
          type: type
        }
      if(type == 'person') {
        // flujo de chat personal
        this.chatService.joinRoom(id);
        this.chatService.findRequest(id).subscribe(data=>{
          if(data.requests.length>0) {
            this.reciever.status = "gratuito"
            this.chatType = 'free';
            this.freechat = data.requests[0].id;
          } else {
            // abrir popover para preguntar tipo
            this.open(content);    
            this.chatType = undefined;
          }
        });
        this.getoldMessages(id);
      } else {
        // flujo de sala de chat
        this.chatService.joinRoom(name);
        this.getoldMessages(name);
      };
    }
  };
  sendMsg(){
    if(this.reciever.type == 'person' ){
      this.chatService.sendMessage(this.msg,this.reciever.id,this.chatType);
    } else {
      this.chatService.sendMessage(this.msg,this.reciever.name,this.chatType);
    }
    this.msg ='';
  }
  setType(type: string){
      this.chatType= type; 
  }
  getoldMessages(room: any){
    this.chatService.getoldMessages(room).subscribe(data =>{
      if(data.room != undefined)
        this.messages = data.room;
      else
        this.messages = data.messages;
    })
  }
  getuserId(){
    return this.chatService.getUserId();
  }
  sendRequest(){
    this.chatService.CreateRequest(this.reciever.id).subscribe(data=>{
    });
  }
  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  // finalizacion de un chat
  finishchat(content){
    switch (this.chatType) {
      case 'free': {
        this.chatType = undefined;
        this.chatService.finishFreeChat(this.reciever.id).subscribe(data=>{
        });
        // poner consulta de finalizacion
        break;
      }
      case 'pay': {
        this.chatType = undefined;
        this.chatService.finishPayChat(this.reciever.id).subscribe(data=>{
        });
        // poner consulta de finalizacion
        break;
      };
      default :{
        this.modalRef.close();
        break;
      }
    }
  };
  ngOnDestroy(){
    this.connection.unsubscribe();
  }

}
