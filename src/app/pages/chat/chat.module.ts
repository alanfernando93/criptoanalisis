import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ThemeModule } from './../../@theme/theme.module';
import {ChatComponent} from './chat.component';
import { ChatService } from './chat.service';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  imports: [
    ThemeModule,
    HttpModule
  ],
  declarations:[
    ChatComponent,
    ContactsComponent
  ],
  providers:[ChatService]
})

export class ChatModule {}