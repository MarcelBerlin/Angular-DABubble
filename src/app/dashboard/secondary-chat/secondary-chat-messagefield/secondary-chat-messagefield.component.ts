import { Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { AppComponent } from 'src/app/app.component';
import { VariablesService } from 'src/app/services/variables.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { ChannelMessagesService } from '../../main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-messages.service';
import { SecondaryChatAnswerService } from '../service/secondary-chat-answer.service';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss'],
})
export class SecondaryChatMessagefieldComponent implements OnInit {
  threadEmojiLeft: boolean = false;
  threadEmojiRight: boolean = false;
  index: number = 0;

  emojiPickerRight: boolean = false;
  emojiPickerLeft: boolean = false;
  emoji: string = '';
  reactionArrLeft: any = [];
  reactionArrRight: any = [];

  constructor(
    public getUser: DataService,
    public app: AppComponent,
    public addService: DialogAddService,
    public varService: VariablesService,
    public getMessage: MessageService,
    public chatService: ChatService,
    public channelMessages: ChannelMessagesService,
    public dataService: DataService,
    public answerService: SecondaryChatAnswerService

  ) { }

  ngOnInit() {
    this.answerService.getThreadAnswer();
  }

  getSelectedMessageStatus() {
    return this.channelMessages.getSelectedMessageStatus();
  }

  addEmojiLeft(event) {
    this.threadEmojiLeft = true;
    this.getMessage.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrLeft.push(this.getMessage.emojis);
    this.emojiPickerLeft = false;
    if (this.reactionArrLeft.length > 1) {
      this.emojiFilterLeft(this.reactionArrLeft);
    }
  }

  addEmojiRight(event) {
    this.threadEmojiRight = true;
    this.getMessage.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrRight.push(this.getMessage.emojis);
    this.emojiPickerRight = false;
    if (this.reactionArrRight.length > 1) { this.emojiFilterRight(this.reactionArrRight) }
  }

  emojiFilterLeft(reactionArr) {
    const emojiCountMapLeft: any = new Map();
    let reactionBarLeft = document.getElementById('reactionBarLeft');
    reactionArr.forEach((emoji) => {
      if (emojiCountMapLeft.has(emoji)) { emojiCountMapLeft.set(emoji, emojiCountMapLeft.get(emoji) + 1); }
      else { emojiCountMapLeft.set(emoji, 1); }
    });
    reactionBarLeft.innerHTML = '';
    emojiCountMapLeft.forEach((count, emoji) => {
      reactionBarLeft.innerHTML += `<div>
          <span class="base"> ${emoji} ${count} 
            <!-- <span class="user-tool">${this.getUser.loggedInUserData.name}</span> -->
          </span>
        </div>`;
    });
    if (reactionArr.length >= 10) {
      reactionBarLeft.innerHTML = 'Zu viele reaktionen. Wir arbeiten gerade daran';
    }
  }

  emojiFilterRight(reactionArr) {
    const emojiCountMapRight: any = new Map();
    let reactionBarRight = document.getElementById('reactionBarRight');
    reactionArr.forEach((emoji) => {
      if (emojiCountMapRight.has(emoji)) {
        emojiCountMapRight.set(emoji, emojiCountMapRight.get(emoji) + 1);
      } else {
        emojiCountMapRight.set(emoji, 1);
      }
    });
    reactionBarRight.innerHTML = '';
    emojiCountMapRight.forEach((count, emoji) => {
      reactionBarRight.innerHTML += `<div matTooltip ='{{this.getUser.loggedInUserData.name}}' class="reaction-container"> <span> ${emoji} ${count} </span> </div>`;
    });
    if (reactionArr.length >= 7) {
      reactionBarRight.innerHTML = 'Zu viele Reaktionen. Wir arbeiten daran';
    }
  }
}
