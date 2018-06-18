import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { Session } from '../../@core/data/session';
@Injectable()
export class ChatService extends Session {
  private baseUrl = this.getApiRest();
  private chatId = 0;

  constructor(private socket: Socket, private http: Http) {
    super();
  }
  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('user says', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
  getErrors() {
    const observable = new Observable(observer => {
      this.socket.on('fail', (data) => {
        observer.next(data);

      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }
  sendMessage(msg: string, room: any, chatType) {
    if (typeof room === 'number') {

      this.socket
        .emit('personal message', {
          'senderId': parseInt(this.getUserId(), 10),
          'message': msg,
          'receptorId': room,
          'chatType': chatType,
        });
    } else {
      this.socket
        .emit('room message', {
          'usuarioId': this.getUserId(),
          'message': msg,
          'room': room,
        });
    }
  }
  joinRoom(room: any) {
    if (typeof room === 'number') {
      this.chatId = parseInt(this.getUserId(), 10);
      (this.chatId > room) ? this.chatId = room * 10 + this.chatId : this.chatId = this.chatId * 10 + room;
      this.socket.emit('join', this.chatId);
    } else {
      this.socket.emit('join', room);
    }
  }
  leave(room: any) {
    if (this.chatId !== 0)
      this.chatId = 0;
    this.socket.emit('leave', room);
  }
  getrooms() {
    return this.http.get(this.baseUrl + 'monedas' + '?access_token=' + localStorage.getItem('auth_app_token'))
      .map((res: Response) => res.json())
  }
  getoldMessages(room: string) {
    if (this.chatId !== 0) {
      return this.http.get(this.baseUrl + 'userMessages/PersonalMessage/' + this.chatId + '?access_token=' + localStorage.getItem('auth_app_token'))
        .map((res: Response) => res.json());
    } else {
      return this.http.get(this.baseUrl + '/messageRooms/RoomMessage/' + room + '?access_token=' + localStorage.getItem('auth_app_token'))
        .map((res: Response) => res.json());
    }

  }
  getUsers() {
    return this.http.get(this.baseUrl + 'usuarios?filter[fields][id]=true&filter[fields][username]=true&filter[fields][perfil]=true')
      .map((res: Response) => res.json())
  }
  getrequests() {
    return this.http.get(this.baseUrl + 'solicitudes/' + this.getUserId() + '/pendientes')
      .map((res: Response) => res.json());
  }
  AcceptRequest(id: number) {
    return this.http.post(this.baseUrl + 'solicitudes/' + id + '/AcceptReq', {})
      .map((res: Response) => res.json());
  }
  RejectRequest(id: number) {
    return this.http.delete(this.baseUrl + 'solicitudes/' + id)
      .map((res: Response) => res.json());
  }
  CreateRequest(reciever: number) {
    return this.http.post(this.baseUrl + 'solicitudes/CrearReq', {
      senderId: this.getUserId(),
      recieverId: reciever,
    }).map((res: Response) => res.json());
  }
  findRequest(reciever: number) {
    return this.http.get(this.baseUrl + 'solicitudes/' + this.getUserId() + '/' + reciever + '/findSol')
      .map((res: Response) => res.json());
  }
  finishFreeChat(reciever: number) {
    return this.http.post(this.baseUrl + 'solicitudes/Finish', {
      sender: this.getUserId(),
      reciever: reciever,
    }).map((res: Response) => res.json());
  };
  finishPayChat(reciever: number) {
    return this.http.post(this.baseUrl + 'transaccions/closeChat', {
      sender: this.getUserId(),
      reciever: reciever,
    }).map((res: Response) => res.json());
  }
}
