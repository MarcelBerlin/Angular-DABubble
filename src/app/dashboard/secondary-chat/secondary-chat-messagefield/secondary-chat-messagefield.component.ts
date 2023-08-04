import { Component, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { DialogUserReactionsComponent } from 'src/app/dialog/dialog-user-reactions/dialog-user-reactions.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AppComponent } from 'src/app/app.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})

export class SecondaryChatMessagefieldComponent {

  public content: any = '';
  public sentTime: any = '';
  public message: any = {};
  public userName: string = '';
  public userImg: string = '';
  public newMessages: number = 0;
  private subbedMessages$: any = [];
  public allMessages: any = [];
  // public allEmojis: any = [];


  constructor(public getUser: DataService,
    public app: AppComponent,
    public firestore: Firestore,
    public getMessage: MessageService,
    public chatService: ChatService,
    private dialog: MatDialog) {

    setTimeout(() => {
      this.getMessages()
    }, 1000);

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
      data: {
        dialogEmoji: this.app.newReaction
      },
    });
  }


  /**
   * subscribes messages from firebase from channel
   */
  getMessages() {
    const coll = collection(this.firestore, 'messages');
    this.subbedMessages$ = collectionData(coll, { idField: 'id' });
    this.subbedMessages$.subscribe((newMessage: any) => { // einzelnen Channel subscriben
      this.allMessages = newMessage;

      console.log('thread = ', this.allMessages);
    });
  }
}