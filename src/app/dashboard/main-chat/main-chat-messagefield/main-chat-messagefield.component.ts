import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { EmojiPickerBossiService } from 'src/app/emoji-picker-bossi/services/emoji-picker-bossi.service';
import { AddUserToMessageService } from 'src/app/services/add-user-to-message.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageAmountService } from 'src/app/direct-chat/services/new-message-amount.service';


@Component({
  selector: 'app-main-chat-messagefield',
  templateUrl: './main-chat-messagefield.component.html',
  styleUrls: ['./main-chat-messagefield.component.scss'],
})
export class MainChatMessagefieldComponent {
  specificChannel: string = '';
  directMessage: string = '';
  loggedUser: string = '';
  searchField: string = '';

  constructor(
    public varService: VariablesService,
    public dataService: DataService,
    public dialogAddService: DialogAddService,
    public messageService: MessageService,
    public chatService: ChatService,
    public directChatService: DirectChatService,
    public emojiService: EmojiPickerBossiService,
    public addUserToMessageService: AddUserToMessageService,
    public dialog: MatDialog,
    private newMessageAmountService: NewMessageAmountService,
  ) { }

  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }

  send() {
    this.onChatTextChanged();
    this.messageSend();
  }

  onChatTextChanged() {
    this.chatService.emptyChat = (
      this.varService.mainChatHead === 0 && this.specificChannel.trim() === ''
    ) || (
        this.varService.mainChatHead === 1 && this.currentUser() && this.loggedUser.trim() === ''
      ) || (
        this.varService.mainChatHead === 1 && !this.currentUser() && this.directMessage.trim() === ''
      ) || (
        this.varService.mainChatHead === 2 && this.searchField.trim() === ''
      );
  }

  messageSend() {
    if (this.varService.mainChatHead == 0 && this.messageService.messageText.length >= 1) {
      this.messageService.addMessage();   
      this.messageService.messageText = '';
    }
    // add by Bossi for directChatService
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && !this.currentUser()) {
      this.directChatService.saveMessage();
      this.newMessageAmountService.addPartnerDirectChatMessageAmount();
    }
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && this.currentUser() ){
      console.log('chat mit sich selber');
    }
  }

  addSign() {
    // this.addUserToMessageService.addToMessage();
    this.varService.sign = !this.varService.sign;
    console.log(this.varService.sign);
  }
}

