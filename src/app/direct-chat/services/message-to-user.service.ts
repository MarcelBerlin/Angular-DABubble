import { Injectable } from '@angular/core';
import { DirectChatService } from './direct-chat.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';
import { NewMessageAmountService } from './new-message-amount.service';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';

@Injectable({
  providedIn: 'root'
})
export class MessageToUserService {

  constructor(
    private dataService: DataService,
    private directChatService: DirectChatService,
    private messageInputService: MessageInputServiceService,
    private newMessageAmountService: NewMessageAmountService,
    private varService: VariablesService,
    private dcshService: DashboardComponentsShowHideService,
  ) {}
  

  messageToUser(arrayId: number) {
    this.currentUser()
      ? this.sendMessageToLoggedUser(arrayId)
      : this.sendMessageToSpecificUser(arrayId);
    this.varService.previousScrollTop = 0; // important for the autoscroll functionality
    this.getDirectChatData(arrayId);
  }
  

  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }


  sendMessageToLoggedUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    this.dcshService.chatSlideOut();
    if (innerWidth <= 800){
      this.dcshService.hideNavigation = true;
    }   
  }

  sendMessageToSpecificUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    this.dcshService.chatSlideOut();
    if (innerWidth <= 800){
      this.dcshService.hideNavigation = true;
    }   
  }


  /**
   * Retrieves direct chat data for the user at the specified index in the user data array.
   * If a direct chat is active, it sets the chat ID, updates the new message amount index, 
   * and resets the own message amount to zero after a delay.
   * 
   * @param {number} arrayId - The index of the user in the user data array.
   * @returns {void}
   */
  getDirectChatData(arrayId: number): void {
    if (this.directChatService.directChatActive) {
      this.messageInputService.chatChange = true;
      const clickedUserId: string = this.dataService.userData[arrayId].id;
      const clickedUserName: string = this.dataService.userData[arrayId].name;
      this.messageInputService.placeholderUserName = clickedUserName; 
      this.messageInputService.placeholderText = 'Nachricht an ' + clickedUserName;
      this.directChatService.getChatId(clickedUserId);
      this.newMessageAmountService.actualPartnerUserDataIndex = arrayId;
      this.messageInputService.setMyVariable(true);
      setTimeout(() => {
        this.newMessageAmountService.setOwnMessageAmountToZero();
      }, 1000);
    }
  }


}
