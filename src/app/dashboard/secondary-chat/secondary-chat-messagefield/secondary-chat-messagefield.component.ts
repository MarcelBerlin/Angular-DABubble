import { Component, Input, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { AppComponent } from 'src/app/app.component';
import { VariablesService } from 'src/app/services/variables.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})

export class SecondaryChatMessagefieldComponent {

  // public content: any = '';
  // public sentTime: any = '';
  // public message: any = {};
  // public userName: string = '';
  // public userImg: string = '';
  // public allMessages: any = [];

  public newAnswer: number = 0; // menge der neuen antworten
  public newContent = false; // ngIf html code anzeigen || nicht

  @Input() newMessages: any;


  constructor(public getUser: DataService,
    public app: AppComponent,
    public addService: DialogAddService,
    public varService: VariablesService,
    public getMessage: MessageService,
    public chatService: ChatService) {
  }

  // userReaction() {
  //   this.dialog.open(DialogUserReactionsComponent, {
  //     data: {
  //       dialogEmoji: this.app.newReaction
  //     },
  //   });
  // }


  /**
   * subscribes messages from firebase from channel
   */
  getMessages() {
    console.log(this.addService.tagsData[this.varService.selectedChannel]);
  }

  // deleteDoubledEmojis(doubledEmoji) {
  //   for (let i = 0; i < doubledEmoji.length; i++) {
  //     if (doubledEmoji[i].emoji && doubledEmoji.filter(item => item.emoji === doubledEmoji[i].emoji).length > 1) {
  //       doubledEmoji.splice(i, 1);
  //       i--;
  //     }
  //   }
  // }
}