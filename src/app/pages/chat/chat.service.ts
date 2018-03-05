import { Injectable } from '@angular/core';
import {Socket} from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ChatService {
  private baseUrl= environment.apiUrl;

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
   sendMessage(msg: string,room: string){
     this.socket
     .emit("new message",{
      'usuarioId': localStorage.getItem('userId'),
      'message': msg,
      'room': room
     } );
   }

   join(room: string){
     this.socket.emit("join",room);
   }

   leave(room: string){
     this.socket.emit("leave", room);
   }

   getrooms(){
    return this.http.get(this.baseUrl + 'monedas' + '?access_token=' + localStorage.getItem('auth_app_token'))
    .map((res: Response) => res.json())
   }
   getoldMessages(room: string){
    return this.http.get(this.baseUrl +'/messageRooms/RoomMessage/' +room+'?access_token=' + localStorage.getItem('auth_app_token'))
    .map((res: Response) => res.json())
   }

}
