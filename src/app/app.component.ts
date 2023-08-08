import { Injectable } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from './services/messages.service';
import { SecondaryChatMessagefieldComponent } from './dashboard/secondary-chat/secondary-chat-messagefield/secondary-chat-messagefield.component';
import { ChannelSelectionComponent } from './dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/channel-selection.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-DABubble';

  public reactionBoo: boolean = false;
  public reactionNumber: any = 0;
  public emoji: string = '';
  public isEmojiPickerVisible: boolean;
  public newReaction: any = [];

  constructor(private getMessage: MessageService,
    // private thread: SecondaryChatMessagefieldComponent,
    // private chat: ChannelSelectionComponent
    ) { }

  public addEmoji(event) {
    this.reactionBoo = true;
    this.newReaction += `${this.emoji}${event.emoji.native}`;

    // this.chat.chatEmojiLeft = false;
    // this.chat.chatEmojiRight = false;
    // this.reactionNumber++;
    // this.getMessage.emojis.push(this.newReaction)
    // if (this.thread.threadEmoji === true) {
    //   this.thread.threadEmoji = false;
    // } else if (this.chat.chatEmojiLeft === true) {
    //   this.chat.chatEmojiLeft = false;
    // } else if (this.chat.chatEmojiRight === true) {
    //   this.chat.chatEmojiRight = false;
    // }
  }





  // ##### EMOJI HTML #####

  //   <img ngDefaultControl name="emoji" [(ngModel)]="emoji" (click)="isEmojiPickerVisible = !isEmojiPickerVisible;"
  //   src="./../../../../assets/img/reaction.png">
  // <br />
  // <emoji-mart ngDefaultControl class="emoji-mart" *ngIf="isEmojiPickerVisible" (emojiSelect)="addEmoji($event)"
  //   title="Choose your emoji">
  // </emoji-mart>
}