import { Injectable } from '@angular/core';
import {Socket} from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import { Session } from '../../@core/data/session';
@Injectable()
export class ChatService extends Session{
  private baseUrl= this.getApiRest();
  private chatId = 0;

  constructor(private socket: Socket, private http: Http) {
    super();
   }
  // mensajes que se reciben en tiempo real
   getMessages(){
     let observable = new Observable(observer =>{
       this.socket.on('user says', (data)=>{
         observer.next(data);
       });
       return ()=>{
         this.socket.disconnect();
       }
     })
     return observable;
   }
   // mensajes de error que se reciben por socket
   getErrors(){
     let observable = new Observable(observer =>{
       this.socket.on('fail', (data)=>{
         observer.next(data);
         console.log(data);
       });
       return ()=>{
         this.socket.disconnect();
       }
     });
     return observable;
   }
   // envia un mensaje de tipo personal o para una sala
   sendMessage(msg: string,room: any,chatType){
     if(typeof room == 'number'){
       console.log('service ',room);
      this.socket
      .emit("personal message",{
        'senderId': parseInt(this.getUserId()),
        'message': msg,
        'receptorId': room,
        'chatType': chatType
      });
     } else {
      this.socket
     .emit("room message",{
      'usuarioId': this.getUserId(),
      'message': msg,
      'room': room
     } );
     }
   }
   // aqui se conecta a una sala especifica
   joinRoom(room: any){
     if(typeof room == 'number')
     {
      this.chatId= parseInt(this.getUserId());
      (this.chatId>room)? this.chatId = room*10+this.chatId : this.chatId = this.chatId*10 +room;
      this.socket.emit("join",this.chatId);
     }
     else{
      this.socket.emit("join",room);
     }
   }
   // desconexion para una sala
   leave(room: any){
     if(this.chatId!=0)
        this.chatId=0;
     this.socket.emit("leave", room);
   }
   // obtine las salas de chat disponibles
   getrooms(){
    return this.http.get(this.baseUrl + 'monedas' + '?access_token=' + localStorage.getItem('auth_app_token'))
    .map((res: Response) => res.json())
   }
   // obtiene los mensajes antiguos de una sala
   getoldMessages(room: string){
     if(this.chatId!=0){
      return this.http.get(this.baseUrl + 'userMessages/PersonalMessage/'+ this.chatId + '?access_token=' + localStorage.getItem('auth_app_token'))
        .map((res: Response)=> res.json());
     } else {
      return this.http.get(this.baseUrl +'/messageRooms/RoomMessage/' +room+'?access_token=' + localStorage.getItem('auth_app_token'))
      .map((res: Response) => res.json());
     }

   }
   // obtiene todos los usuarios disponibles para el chat
   getUsers(){
    return this.http.get(this.baseUrl + 'usuarios?filter[fields][id]=true&filter[fields][username]=true&filter[fields][perfil]=true')
    .map((res: Response) => res.json())
   }
   // obtiene todas las solicitudes de chat que tiene un usuario
   getrequests(){
     return this.http.get(this.baseUrl + 'solicitudes/' + this.getUserId() + '/pendientes')
     .map((res: Response)=> res.json());
   }
   //acepta una solicitud especifica
   AcceptRequest(id: number){
    return this.http.post(this.baseUrl + 'solicitudes/' +id+'/AcceptReq',{})
    .map((res: Response)=> res.json());
   }
   // rechaza una solicitud especifica
   RejectRequest(id: number){
     return this.http.delete(this.baseUrl+'solicitudes/'+id)
     .map((res: Response)=> res.json());
   }
   // envia una solicitud de chat
   CreateRequest(reciever: number){
     return this.http.post(this.baseUrl+'solicitudes/CrearReq',{
       senderId: this.getUserId(),
       recieverId: reciever
     }).map((res: Response)=> res.json());
   }
   // busca si existe una solicitud de chat
   findRequest(reciever: number){
     return this.http.get(this.baseUrl+'solicitudes/'+this.getUserId()+'/'+reciever+'/findSol')
     .map((res: Response)=>res.json());
   }
  //finaliza un chat gratis
  finishFreeChat(reciever: number) {
    return this.http.post(this.baseUrl+'solicitudes/Finish',{
      sender: this.getUserId(),
      reciever: reciever
    }).map((res: Response)=>res.json());
  };
  finishPayChat(reciever: number){
    return this.http.post(this.baseUrl+'transaccions/closeChat',{
      sender: this.getUserId(),
      reciever: reciever
    }).map((res: Response)=> res.json());
  }
}
