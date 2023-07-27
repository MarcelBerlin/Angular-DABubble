import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { DirectChatService } from 'src/app/direct-chat/direct-chat.service';


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
    private directChatService: DirectChatService
  ) { }

  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
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

  messageSend(channel, specificUser, ownUser, searchInput) {
    if (this.varService.mainChatHead == 0) {
      this.messageService.addMessage(channel);
      console.log('Diese Nachricht ging an' + channel);
    }
    // add by Bossi
    if (this.varService.mainChatHead === 1) {
      this.getDirectChatMessage();
    }
  }


  // add by Bossi for directChatService
  getDirectChatMessage():void {
    console.log('Funktionsaufruf für direkt chat', this.directMessage);
    this.directChatService.directMessage = this.directMessage;
    this.directMessage = '';
  }



}

