import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-main-chat-messagefield',
  templateUrl: './main-chat-messagefield.component.html',
  styleUrls: ['./main-chat-messagefield.component.scss'],
})
export class MainChatMessagefieldComponent {
  specificChannel: string = '';
  selectedUser: string = '';
  loggedUser: string = '';
  searchField: string = '';

  constructor(
    public varService: VariablesService,
    public dataService: DataService,
    public dialogAddService: DialogAddService,
    public messageService: MessageService,  
    public chatService: ChatService  
  ) {}

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
      this.varService.mainChatHead === 1 && !this.currentUser() && this.selectedUser.trim() === ''
    ) || (
      this.varService.mainChatHead === 2 && this.searchField.trim() === ''
    );
  }

  messageSend(channel, specificUser, ownUser, searchInput) {
    if (this.varService.mainChatHead == 0) {
      this.messageService.addMessage(channel);
    // } else if (this.varService.mainChatHead == 1) {
    //   this.messageService.addMessage(specificUser);
    // } else if (this.varService.mainChatHead == 3) {
    //   this.messageService.addMessage(ownUser);
    // } else {
    //   this.messageService.addMessage(searchInput);
   }
    console.log('Diese Nachricht ging an' + channel);
  }
}
