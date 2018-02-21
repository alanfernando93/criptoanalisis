import { Injectable } from '@angular/core';
import {Socket} from 'ng-socket-io';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'; 

@Injectable()
export class ChatService {

  constructor(private socket: Socket) {
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
   sendMessage(msg: string){
     this.socket
     .emit("new message",{
      'userId': 1,
      'message': msg
     } );
   }

}
