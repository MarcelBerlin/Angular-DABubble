import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, Renderer2 } from '@angular/core';
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
import { ChannelTimeStamp } from './models/channel-timestamp.class';
import { Messages } from 'src/app/models/messages.interface';
import { ChannelMessagesService } from './service/channel-messages.service';
import { SecondaryChatAnswerService } from 'src/app/dashboard/secondary-chat/service/secondary-chat-answer.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-channel-selection',
  templateUrl: './channel-selection.component.html',
  styleUrls: ['./channel-selection.component.scss'],
})
export class ChannelSelectionComponent implements OnInit {

  hoveredMessagesMainChat: boolean = false;

  index: number;
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
  isThereAnAnswer: boolean = false;
  emptyChat: boolean = false;
  private emptyChatSubscription: Subscription;

  constructor(
    private firestore: Firestore,
    private dcshService: DashboardComponentsShowHideService,
    private renderer: Renderer2,
    private dialog: Dialog,
    public varService: VariablesService,
    public dataService: DataService,
    public dialogAdd: DialogAddService,
    public directChatService: DirectChatService,
    public messageService: MessageService,
    public chatService: ChatService,
    public app: AppComponent,
    public timelinesService: TimelinesService,
    public channelMessages: ChannelMessagesService,
    public answerService: SecondaryChatAnswerService,
    public secondaryAnswerService: SecondaryChatAnswerService,
    public inputService: MessageInputServiceService,
  ) {
    
  }

  ngOnInit() { 
    this.emptyChatSubscription = this.messageService.emptyChat$.subscribe((isEmpty) => {
      this.emptyChat = isEmpty;
    });
  }

  ngOnDestroy() {
    this.emptyChatSubscription.unsubscribe();
  }

  checkIfChannelIsEmpty() { 
    if (this.channelMessages.MessageAmount === 0) {
      this.emptyChat = true;
    } else {
      this.emptyChat = false;
    }       
  }

  get isChannelEmpty() {
    this.checkIfChannelIsEmpty();
    return this.emptyChat;
  }

  
  /**
   * Opens the secondary chat by invoking the 'chatSlideIn' method of the 'dcshService'.
   *
   * This method is responsible for triggering the slide-in animation of the secondary chat.
   */

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

  checkIfThereIsAnAnswer() {
    if (this.secondaryAnswerService.messagesArray[0].amountAnswers.length > 0) {
      this.isThereAnAnswer = true;
    } else {
      this.isThereAnAnswer = false;
    }
  }

  addEmoji(event, index) {
    this.messageService.emojis = `${this.emoji}${event.emoji.native}`;
    this.channelMessages.messageEmojis.push(this.messageService.emojis);
    if(this.emojiPickerLeft) { this.emojiPickerLeft = false };  // verlagern
    if(this.emojiPickerRight) { this.emojiPickerRight = false };  // verlagern
    this.channelMessages.selectedMessageIndex = index;
    console.log(this.channelMessages.messageEmojis,'firebase');
    this.channelMessages.UpdateEmojiToFirebase(index);
    // if (this.channelMessages.messageEmojis.length > 1) { this.emojiFilterRight()}
  }

  // emojiFilterRight() {
  //   const emojiCountMapRight: any = new Map();
  //   let reactionBarRight = document.getElementById('reactionBarRight');
  //   this.channelMessages.messageEmojis.forEach((emoji) => {
  //     if (emojiCountMapRight.has(emoji)) {
  //       emojiCountMapRight.set(emoji, emojiCountMapRight.get(emoji) + 1);
  //     } else {
  //       emojiCountMapRight.set(emoji, 1);
  //     }
  //   });
  //   reactionBarRight.innerHTML = '';
  //   emojiCountMapRight.forEach((count, emoji) => {
  //     reactionBarRight.innerHTML += `<div class="reaction-container"> <span> ${emoji} ${count} </span> </div>`;
  //   });
  //   if (this.channelMessages.messageEmojis.length >= 7) {
  //     reactionBarRight.innerHTML = 'Zu viele Reaktionen. Wir arbeiten daran 😊';
  //   }
  // }

  showInfoBox: number = -1;
  timeoutArray: any[] = [];

  /**
   * Displays additional information or an info box for an item or element at the specified index.
   *
   * @param {number} index - The index of the item or element for which to display information.
   * @returns {void}
   */
  showInfoOutput(index: number, i: number): void {
    this.clearTimoutArray();
    const indexString = index.toString();
    const iString = i.toString();
    const newNumber = +(indexString + iString);
    this.showInfoBox = newNumber;
  }

  /**
   * Creates a unique information ID by combining two numbers.
   *
   * @param {number} index - The first number to be combined.
   * @param {number} i - The second number to be combined.
   * @returns {number} A new unique information ID.
   */
  createInfoId(index: number, i: number): number {
    const indexString = index.toString();
    const iString = i.toString();
    const newNumber = +(indexString + iString);
    return newNumber;
  }

  /**
   * Hides or closes the currently displayed information or info box.
   *
   * @returns {void}
   */
  hideInfoOutput(): void {
    let leaveTimeOut = setTimeout(() => {
      this.showInfoBox = -1;
    }, 500);
    this.timeoutArray.push(leaveTimeOut);
  }

  /**
   * Clears all timeouts stored in the timeoutArray.
   *
   * @returns {void}
   */
  clearTimoutArray(): void {
    for (let i = 0; i < this.timeoutArray.length; i++) {
      const element = this.timeoutArray[i];
      clearTimeout(element);
    }
  }

  console(entry) {
    console.log(entry);
  }

  // alertMessage(){
  //   alert('Hier soll eigentlich der Button sein, zum bearbeiten der Frage');
  // }
}
