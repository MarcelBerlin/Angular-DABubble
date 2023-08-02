import { Component, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { DatePipe } from '@angular/common';
import { DialogUserReactionsComponent } from 'src/app/dialog/dialog-user-reactions/dialog-user-reactions.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})
export class SecondaryChatMessagefieldComponent {

  public emoji: string = '';
  public isEmojiPickerVisible: boolean;
  public content: any = 'MUSTERNACHRICHT';
  public sentTime: any = '';
  public message: any = {};
  public userName: string = '';
  public userImg: string = '';
  public newMessages: number = 0;
  public newReaction: any = [];
  public reaction: boolean = false;
  public reactionNumber: any = 0;
  private subbedMessages$: any = [];


  constructor(public getUser: DataService,
    public firestore: Firestore,
    public getMessage: MessageService,
    public time: DatePipe,
    public messageService: MessageService,
    public chatService: ChatService,
    public dialog: MatDialog) {
    setTimeout(() => {
      this.getMessages()
    }, 1000);
  }


  public addEmoji(event) {
    this.reaction = true;
    this.newReaction += `${this.emoji}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
    this.reactionNumber++;
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
    this.dialog.open(DialogUserReactionsComponent, { //dialog für user, die mit emojis reagiert haben
      // data: {
      //   this.getUser.loggedInUserData.name: this.emoji,  // Variable für emoji gekoppelt mit user
      //   this.getUser.loggedInUserData.name: this.emoji,  // Variable für emoji gekoppelt mit user
      //   this.getUser.loggedInUserData.name: this.emoji   // Variable für emoji gekoppelt mit user
      // },
    });
  }


  getMessages() {
    //   const coll = collection(this.firestore, 'messages');
    //   this.subbedMessages$ = collectionData(coll, { idField: 'id' });
    //   this.subbedMessages$.subscribe((newMessage: any) => {
    //     this.getMessageDatas(newMessage);

    //   });
  }


  // messageJson() {
  //   return this.message =
  //   {
  //     name: this.userName,
  //     time: this.sentTime,
  //     message: this.content,
  //     img: this.userImg,
  //     emoji: this.emoji
  //   };
  // }


  getMessageDatas(newMessage) {
    //   for (let i = 0; i < newMessage.length; i++) {
    //     const forMessages = newMessage[i];
    //     this.sentTime = forMessages.timestamp.clockString;
    //     this.content = forMessages.content;
    //     this.userName = forMessages.userName;
    //     this.userImg = forMessages.userImg;
    //   }
  }
}
