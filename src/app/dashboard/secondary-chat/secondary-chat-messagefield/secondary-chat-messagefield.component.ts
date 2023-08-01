import { Component, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { DatePipe } from '@angular/common';
import { DialogUserReactionsComponent } from 'src/app/dialog/dialog-user-reactions/dialog-user-reactions.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})
export class SecondaryChatMessagefieldComponent {

  public emoji: string = '';
  public chatMessages: any = [];
  public isEmojiPickerVisible: boolean;
  public content: any = 'MUSTERNACHRICHT';
  public actualTime: any = this.time.transform((new Date), 'HH:mm:ss');
  public sentTime: any = 13 + '.' + 12 + 'Uhr' // change later to sending message time
  public message: any = {};
  public newMessages: number = 0;
  public newReaction: any = [];
  public reaction: boolean = false;
  public reactionNumber: any = 0;


  constructor(public getUser: DataService,
    public getMessage: MessageService,
    public time: DatePipe,
    public dialog: MatDialog) {
    setTimeout(() => this.getMessages(), 1000);
  }


  public addEmoji(event) {
    this.reaction = true;
    this.newReaction += `${this.emoji}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
    this.reactionNumber ++;
    // Emoji dem User zuordnen.
    // if (this.reactionNumber > 1) {
    //   this.deleteDoubledEmojis(this.newReaction);
    // }
  }

  // deleteDoubledEmojis(doubledEmoji) {
  //   for (let i = 0; i < doubledEmoji.length; i++) {
  //     if (doubledEmoji[i].emoji && doubledEmoji.filter(item => item.emoji === doubledEmoji[i].emoji).length > 1) {
  //       doubledEmoji.splice(i, 1);
  //       i--;
  //     }
  //   }
  // }

  userReaction() {
    this.dialog.open(DialogUserReactionsComponent, {
      // data: {
      //   this.getUser.loggedInUserData.name: this.emoji,  // Variable für emoji gekoppelt mit user
      //   this.getUser.loggedInUserData.name: this.emoji,  // Variable für emoji gekoppelt mit user
      //   this.getUser.loggedInUserData.name: this.emoji   // Variable für emoji gekoppelt mit user
      // },
    });
  }

  async getMessages() {
    // *ngFor all messages from channel
    this.message =
    {
      name: this.getUser.loggedInUserData.name, // user from channel
      time: this.sentTime,                      // time from channel
      message: this.content,                    // message from channel
      img: this.getUser.loggedInUserData.img,   //  user-img from channel
      emoji: this.emoji                         // reaction bar from channel
    };

    // console.log('thread-mesage', this.message);
  };
}
