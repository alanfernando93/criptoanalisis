import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ThemeModule } from './../../@theme/theme.module';
import {ChatComponent} from './chat.component';
import { ChatService } from './chat.service';

@NgModule({
  imports: [
    ThemeModule,
    HttpModule
  ],
  declarations:[
    ChatComponent,
  ],
  providers:[ChatService]
})

export class ChatModule {}