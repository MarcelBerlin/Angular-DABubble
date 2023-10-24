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
import { ChannelTimeStamp } from './models/channel-timestamp.class';
import { Messages } from 'src/app/models/messages.interface';
import { ChannelMessagesService } from './service/channel-messages.service';
import { SecondaryChatAnswerService } from 'src/app/dashboard/secondary-chat/service/secondary-chat-answer.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';
@Component({
  selector: 'app-channel-selection',
  templateUrl: './channel-selection.component.html',
  styleUrls: ['./channel-selection.component.scss'],
})
export class ChannelSelectionComponent implements OnInit {
  hoveredMessagesMainChat: boolean = false;

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

  constructor(
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
    public timelinesService: TimelinesService,
    public channelMessages: ChannelMessagesService,
    public answerService: SecondaryChatAnswerService,
    public secondaryAnswerService: SecondaryChatAnswerService,
    public inputService: MessageInputServiceService
  ) {
    
  }

  ngOnInit(): void {    
  }

  checkIfChannelIsEmpty() {    
    if (this.dialogAdd.channelMessageAmount < 1) {
      return false;
    } else return true;   
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

  public addEmojiRight(event) {
    this.chatEmojiRight = true;
    this.messageService.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrRight.push(this.messageService.emojis); // speichern in firebase fuer jede nachricht einzeln?
    this.emojiPickerRight = false;
    if (this.reactionArrRight.length > 1) {
      this.emojiFilterRight(this.reactionArrRight);
    }
  }

  emojiFilterRight(reactionArr) {
    // tooltip funktioniert nicht mehr!
    const emojiCountMapRight: any = new Map();
    let reactionBarRight = document.getElementById('reactionBarRight'); // ABOUT TO CHANGE
    reactionArr.forEach((emoji) => {
      if (emojiCountMapRight.has(emoji)) {
        emojiCountMapRight.set(emoji, emojiCountMapRight.get(emoji) + 1);
      } else {
        emojiCountMapRight.set(emoji, 1);
      }
    });
    reactionBarRight.innerHTML = '';
    emojiCountMapRight.forEach((count, emoji) => {
      reactionBarRight.innerHTML += `<div matTooltip ='{{this.dataService.loggedInUserData.name}}' class="reaction-container"> <span> ${emoji} ${count} </span> </div>`;
    });
    if (reactionArr.length >= 7) {
      reactionBarRight.innerHTML = 'Zu viele Reaktionen. Wir arbeiten daran 😊';
    }
  }

  public addEmojiLeft(event) {
    this.chatEmojiLeft = true;
    this.messageService.emojis = `${this.emoji}${event.emoji.native}`;
    this.reactionArrLeft.push(this.messageService.emojis); // speichern in firebase fuer jede nachricht einzeln?
    this.emojiPickerLeft = false;
    if (this.reactionArrLeft.length > 1) {
      this.emojiFilterLeft(this.reactionArrLeft);
    }
  }

  emojiFilterLeft(reactionArr) {
    // tooltip funktioniert nicht mehr!
    const emojiCountMapLeft: any = new Map();
    let reactionBarLeft = document.getElementById('reactionBarLeft');
    reactionArr.forEach((emoji) => {
      if (emojiCountMapLeft.has(emoji)) {
        emojiCountMapLeft.set(emoji, emojiCountMapLeft.get(emoji) + 1);
      } else {
        emojiCountMapLeft.set(emoji, 1);
      }
    });
    reactionBarLeft.innerHTML = '';
    emojiCountMapLeft.forEach((count, emoji) => {
      reactionBarLeft.innerHTML += `<div matTooltip ='{{this.dataService.loggedInUserData.name}}' class="reaction-container"><span> ${emoji} ${count} </span></div>`;
    });
    if (reactionArr.length >= 7) {
      reactionBarLeft.innerHTML =
        'zu viele reaktionen. Wir arbeiten gerade daran 🙁';
    }
  }

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
}
