import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { AppComponent } from 'src/app/app.component';
import { VariablesService } from 'src/app/services/variables.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';


@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})

export class SecondaryChatMessagefieldComponent {

  @ViewChild('reactions') reactions: ElementRef;

  public content: any = '';       // wieder loeschen, wenn main chat fertig ist
  public sentTime: any = '';      // wieder loeschen, wenn main chat fertig ist
  public message: any = {};       // wieder loeschen, wenn main chat fertig ist
  public userName: string = '';   // wieder loeschen, wenn main chat fertig ist
  public userImg: string = '';    // wieder loeschen, wenn main chat fertig ist
  public allMessages: any = [];   // wieder loeschen, wenn main chat fertig ist

  public threadEmojiLeft: boolean = false;
  public threadEmojiRight: boolean = false;

  public emojiPickerRight: boolean = false;
  public emojiPickerLeft: boolean = false;
  public emoji: string = '';
  public reactionArrLeft: any = [];
  public reactionArrRight: any = [];

  constructor(public getUser: DataService,
    public app: AppComponent,
    public addService: DialogAddService,
    public varService: VariablesService,
    public getMessage: MessageService,
    public chatService: ChatService) {
  }


  public addEmojiLeft(event) {
    this.threadEmojiLeft = true;
    this.getMessage.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrLeft.push(this.getMessage.emojis);
    this.emojiPickerLeft = false;
    if (this.reactionArrLeft.length > 1) { this.emojiFilterLeft(this.reactionArrLeft); }
  }


  emojiFilterLeft(reactionArr) {
    const emojiCountMapLeft: any = new Map();
    let reactionBarLeft = document.getElementById("reactionBarLeft");
    reactionArr.forEach(emoji => {
      if (emojiCountMapLeft.has(emoji)) {emojiCountMapLeft.set(emoji, emojiCountMapLeft.get(emoji) + 1);
      } else {emojiCountMapLeft.set(emoji, 1);}
    });
    reactionBarLeft.innerHTML = '';
    emojiCountMapLeft.forEach((count, emoji) => {
      reactionBarLeft.innerHTML +=
        `<div matTooltip ='{{this.getUser.loggedInUserData.name}}' class="reaction-container"> <span> ${emoji} ${count} </span> </div>`
    });

    if(reactionArr.length >= 10) { reactionBarLeft.innerHTML = 'Zu viele reaktionen. Wir arbeiten gerade daran'}
  }


  public addEmojiRight(event) {
    this.threadEmojiRight = true;
    this.getMessage.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrRight.push(this.getMessage.emojis);
    this.emojiPickerRight = false;
    if(this.reactionArrRight.length > 1) {this.emojiFilterRight(this.reactionArrRight); }
  }


  emojiFilterRight(reactionArr) {
    const emojiCountMapRight: any = new Map();
    let reactionBarRight = document.getElementById("reactionBarRight");
    reactionArr.forEach(emoji => {
      if (emojiCountMapRight.has(emoji)) {emojiCountMapRight.set(emoji, emojiCountMapRight.get(emoji) + 1);} 
      else {emojiCountMapRight.set(emoji, 1);}
    }); 
    reactionBarRight.innerHTML = '';
    emojiCountMapRight.forEach((count, emoji) => {
      reactionBarRight.innerHTML +=
        `<div matTooltip ='{{this.getUser.loggedInUserData.name}}' class="reaction-container"> <span> ${emoji} ${count} </span> </div>`
    });
    if(reactionArr.length >= 7) { reactionBarRight.innerHTML = 'Zu viele Reaktionen. Wir arbeiten daran'}
  }
}