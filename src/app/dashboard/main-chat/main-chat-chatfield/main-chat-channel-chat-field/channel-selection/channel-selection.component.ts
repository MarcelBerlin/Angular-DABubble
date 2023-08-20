import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AppComponent } from 'src/app/app.component';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { TimelinesService } from 'src/app/direct-chat/services/timelines.service';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-channel-selection',
  templateUrl: './channel-selection.component.html',
  styleUrls: ['./channel-selection.component.scss'],
})
export class ChannelSelectionComponent implements OnInit {
  hoveredMessagesMainChat: boolean = false;
  emptyChat: boolean = true;
  chatText: string = '';
  messages$: any = [];
  messageData: any = [];
  hoveredIndex: number | null = null;

  chatEmojiRight: boolean = false;
  chatEmojiLeft: boolean = false;
  emojiPickerRight: boolean = false;
  emojiPickerLeft: boolean = false;
  emoji: string = '';
  reactionArrRight: any = [];
  reactionArrLeft: any = [];

  constructor (
    private firestore: Firestore,
    private dcshService: DashboardComponentsShowHideService,
    private dialog: Dialog,
    public varService: VariablesService,
    public dataService: DataService,
    public dialogAdd: DialogAddService,
    public directChatService: DirectChatService,
    public messageService: MessageService,
    public chatService: ChatService,
    public app: AppComponent,
    public timelinesService: TimelinesService
    ) {
    this.allMessages();
  }

  ngOnInit(): void {
    
  }

  allMessages() {
    const coll = collection(this.firestore, 'messages');
    this.messages$ = collectionData(coll, { idField: 'id' });
    this.messages$.subscribe((message: any) => {
      this.messageData = message.sort((a, b) => a.timestamp.dateTimeNumber - b.timestamp.dateTimeNumber);
      console.log(this.messageService.channelMessages);
    });   
  }

  checkIfChannelIsEmpty() {
    this.emptyChat = this.messageData.length === 0;
  }

  /**
   * Opens the secondary chat by invoking the 'chatSlideIn' method of the 'dcshService'.
   *
   * This method is responsible for triggering the slide-in animation of the secondary chat.
   */
  openSecondaryChat() {
    this.dcshService.chatSlideIn();
  }

  /**
   * Opens the 'DialogProfileViewUsersComponent' dialog to display user profiles.
   *
   * This method is responsible for triggering the dialog to show user profiles in a view.
   * The 'DialogProfileViewUsersComponent' is used for rendering the user profile details.
   */
  profileViewUsers() {
    this.dialog.open(DialogProfileViewUsersComponent);
  }

  
  onHover(index: number) {
    this.hoveredIndex = index;
  }

  onHoverEnd() {
    this.hoveredIndex = null;
  }


  public addEmojiRight(event) {
    this.chatEmojiRight = true;
    this.messageService.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrRight.push(this.messageService.emojis); // speichern in firebase fuer jede nachricht einzeln?
    this.emojiPickerRight = false;
    if(this.reactionArrRight.length > 1) {this.emojiFilterRight(this.reactionArrRight); }
  }

  emojiFilterRight(reactionArr) { // tooltip funktioniert nicht mehr!
    const emojiCountMapRight: any = new Map();
    let reactionBarRight = document.getElementById("reactionBarRight"); // ABOUT TO CHANGE
    reactionArr.forEach(emoji => {
      if (emojiCountMapRight.has(emoji)) {emojiCountMapRight.set(emoji, emojiCountMapRight.get(emoji) + 1);} 
      else {emojiCountMapRight.set(emoji, 1);}
    }); 
    reactionBarRight.innerHTML = '';
    emojiCountMapRight.forEach((count, emoji) => {
      reactionBarRight.innerHTML +=
        `<div matTooltip ='{{this.dataService.loggedInUserData.name}}' class="reaction-container"> <span> ${emoji} ${count} </span> </div>`
    });
    if(reactionArr.length >= 7) { reactionBarRight.innerHTML = 'Zu viele Reaktionen. Wir arbeiten daran 😊'}
  }


  public addEmojiLeft(event) {
    this.chatEmojiLeft = true;
    this.messageService.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrLeft.push(this.messageService.emojis); // speichern in firebase fuer jede nachricht einzeln?
    this.emojiPickerLeft = false;
    if (this.reactionArrLeft.length > 1) { this.emojiFilterLeft(this.reactionArrLeft); }
  }


  emojiFilterLeft(reactionArr) {  // tooltip funktioniert nicht mehr!
    const emojiCountMapLeft: any = new Map();
    let reactionBarLeft = document.getElementById("reactionBarLeft");
    reactionArr.forEach(emoji => {
      if (emojiCountMapLeft.has(emoji)) {emojiCountMapLeft.set(emoji, emojiCountMapLeft.get(emoji) + 1);
      } else {emojiCountMapLeft.set(emoji, 1);}
    });
    reactionBarLeft.innerHTML = '';
    emojiCountMapLeft.forEach((count, emoji) => {
      reactionBarLeft.innerHTML +=
        `<div matTooltip ='{{this.dataService.loggedInUserData.name}}' class="reaction-container"><span> ${emoji} ${count} </span></div>`
    });
    if(reactionArr.length >= 7) { reactionBarLeft.innerHTML = 'zu viele reaktionen. Wir arbeiten gerade daran 🙁'}
  }
  
}
