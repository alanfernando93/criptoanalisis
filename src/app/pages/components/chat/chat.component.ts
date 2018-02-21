import { Component, OnInit } from '@angular/core';
import { ChatService} from './chat.service';

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

  constructor(private chatService : ChatService) {}

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message =>{
      this.messages.push(message);
    })
  }

  sendMsg(msg){
     this.chatService.sendMessage(msg);
     this.msg ='';
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }

}
