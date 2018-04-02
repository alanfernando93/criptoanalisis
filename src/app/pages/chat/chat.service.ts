import { Injectable } from '@angular/core';
import {Socket} from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ChatService {
  private baseUrl= environment.apiUrl;
  private chatId = 0;

  constructor(private socket: Socket, private http: Http) {
   }
  
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
   sendMessage(msg: string,room: any,chatType){
     if(typeof room == 'number'){
      this.socket
      .emit("personal message",{
        'senderId': parseInt(localStorage.getItem('userId')),
        'message': msg,
        'receptorId': room,
        'chatType': chatType
      });
     } else {
      this.socket
     .emit("room message",{
      'usuarioId': localStorage.getItem('userId'),
      'message': msg,
      'room': room
     } );
     }
   }

   joinRoom(room: any){
     if(typeof room == 'number')
     {
      this.chatId= parseInt(localStorage.getItem('userId'));
      (this.chatId>room)? this.chatId = room*10+this.chatId : this.chatId = this.chatId*10 +room;
      this.socket.emit("join",this.chatId);
     }
     else{
      this.socket.emit("join",room);
     }
   }

   leave(room: any){
     if(this.chatId!=0)
        this.chatId=0;
     this.socket.emit("leave", room);
   }

   getrooms(){
    return this.http.get(this.baseUrl + 'monedas' + '?access_token=' + localStorage.getItem('auth_app_token'))
    .map((res: Response) => res.json())
   }
   getoldMessages(room: string){
     if(this.chatId!=0){
      return this.http.get(this.baseUrl + 'userMessages/PersonalMessage/'+ this.chatId + '?access_token=' + localStorage.getItem('auth_app_token'))
        .map((res: Response)=> res.json());
     } else {
      return this.http.get(this.baseUrl +'/messageRooms/RoomMessage/' +room+'?access_token=' + localStorage.getItem('auth_app_token'))
      .map((res: Response) => res.json());
     }

   }
   getUsers(){
    return this.http.get(this.baseUrl + 'usuarios?filter[fields][id]=true&filter[fields][username]=true&filter[fields][perfil]=true')
    .map((res: Response) => res.json())
   }

}
