import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('threadReaction') threadReaction: any;

  public content: any = '';       // wieder loeschen, wenn main chat fertig ist
  public sentTime: any = '';      // wieder loeschen, wenn main chat fertig ist
  public message: any = {};       // wieder loeschen, wenn main chat fertig ist
  public userName: string = '';   // wieder loeschen, wenn main chat fertig ist
  public userImg: string = '';    // wieder loeschen, wenn main chat fertig ist
  public allMessages: any = [];   // wieder loeschen, wenn main chat fertig ist

  public threadEmoji: boolean = false;
  public emojiPickerRight: boolean = false;
  public emojiPickerLeft: boolean = false;
  public emoji: string = '';
  public reactionArr: any = [];
  public emojiCounter: number = 0;



  constructor(public getUser: DataService,
    public app: AppComponent,
    public addService: DialogAddService,
    public varService: VariablesService,
    public getMessage: MessageService,
    public chatService: ChatService) 
    {
      console.log(this.addService.tagsData);
    }

    public addEmoji(event) {
      this.threadEmoji = true;
      this.reactionArr += `${this.emoji }${event.emoji.native}`;
      // this.emojiCounter++; bei selben emoji = anzahl dahinter
      this.getMessage.emojis.push(this.reactionArr);
      if(this.emojiPickerLeft) { this.emojiPickerLeft = false}
      if(this.emojiPickerRight) { this.emojiPickerRight = false}

    }

  


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