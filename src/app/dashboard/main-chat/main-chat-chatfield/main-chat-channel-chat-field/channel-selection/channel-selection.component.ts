import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
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
import { EmojiPickerBossiService } from 'src/app/emoji-picker-bossi/services/emoji-picker-bossi.service';


@Component({
  selector: 'app-channel-selection',
  templateUrl: './channel-selection.component.html',
  styleUrls: ['./channel-selection.component.scss'],
})
export class ChannelSelectionComponent {

  hoveredMessagesMainChat: boolean = false;

  index: number;
  chatText: string = '';
  messages$: any = [];
  messageData: any = [];
  hoveredIndex: number | null = null;
  chatEmojiRight: boolean;
  chatEmojiLeft: boolean;
  emojiPickerRight: boolean = false;
  emojiPickerLeft: boolean = false;
  emoji: string = '';
  messageEmote: any;
  isThereAnAnswer: boolean = false;

  @ViewChildren('reactionBarRight') emojiBar: ElementRef



  constructor(
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
    public emojiService: EmojiPickerBossiService
  ) { 
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
    this.channelMessages.messageData[index].messageEmojis.push(`${this.emoji}${event.emoji.native}`);
    if (this.emojiPickerLeft) {
      this.emojiPickerLeft = false;
      this.chatEmojiLeft = true;
    };

    if (this.emojiPickerRight) {
      this.emojiPickerRight = false;
      this.chatEmojiRight = true;
    };
    
    this.channelMessages.selectedMessageIndex = index;
    this.channelMessages.UpdateEmojiToFirebase(index);
    // if(this.channelMessages.messageData[index].messageEmojis.length > 1) { this.emojiMapper(index)}
  }

  // emojiMapper(index) {
  //   debugger;
  //   const emojiCountMapRight: any = new Map();
  //   this.channelMessages.messageData[index].messageEmojis.forEach((emoji) => {
  //     if (emojiCountMapRight.has(emoji)) {
  //       emojiCountMapRight.set(emoji, emojiCountMapRight.get(emoji) + 1);
  //     } else {
  //       emojiCountMapRight.set(emoji, 1);
  //     }
  //   });
  //   this.emojiBar.nativeElement.innerHTML = '';
  //   emojiCountMapRight.forEach((count, emoji) => {
  //     this.emojiBar.nativeElement.innerHTML += `<div class="reaction-container"> <span> ${emoji} ${count} </span> </div>`;
  //   });
  //   if (this.channelMessages.messageData[index].messageEmojis.length >= 7) {
  //     this.emojiBar.nativeElement.innerHTML = '<p>Zu viele Reaktionen. Wir arbeiten daran 😊</p>';
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


  filterMessages(){
    let messages = [];
    this.channelMessages.messageData.forEach(message => {
      if (message.channelId == this.dialogAdd.tagsData[this.dialogAdd.channelIndex].id) {
        messages.push(message);
      }
    });
    if (messages.length == 0) { return true; } 
    else { return false; }
    
  }
}
