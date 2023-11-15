import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent } from 'src/app/dialog/dialog-info/dialog-info.component';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { HeaderDialogComponent } from 'src/app/dialog/header-dialog/header-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { DialogInfoService } from 'src/app/services/dialog-info.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { NewMessageAmountService } from 'src/app/direct-chat/services/new-message-amount.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';

@Component({
  selector: 'app-main-chat-message-head',
  templateUrl: './main-chat-message-head.component.html',
  styleUrls: ['./main-chat-message-head.component.scss'],
})
export class MainChatMessageHeadComponent {
  online: boolean = false;
  userData = this.dataService.userData;

  constructor(
    public dataService: DataService,
    private dialog: MatDialog,
    public varService: VariablesService,
    private dialogInfoService: DialogInfoService,
    private directChatService: DirectChatService,
    private dcshService: DashboardComponentsShowHideService,
    private newMessageAmountService: NewMessageAmountService,
    private messageInputService: MessageInputServiceService,
  ) {}

  /**
   * Opens the 'DialogProfileViewUsersComponent' dialog to display the profile of a selected member.
   *
   * This method sets the 'selectedUserDetailView' variable in 'varService' to the selected user for viewing.
   * Then, it opens the 'DialogProfileViewUsersComponent' dialog to display the profile details of the selected user.
   */
  openMember() {
    this.varService.setVar(
      'selectedUserDetailView',
      this.varService.selectedUserToMessage
    );
    this.currentUser()
      ? this.dialog.open(HeaderDialogComponent)
      : this.dialog.open(DialogProfileViewUsersComponent);
  }

  /**
   * Checks if the current user matches the selected user for messaging.
   *
   * This method compares the email address of the currently logged-in user
   * with the email address of the selected user for messaging.
   *
   * @returns {boolean} - True if the current user matches the selected user for messaging,
   *                     otherwise false.
   */
  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }


  option(event) {
    this.directChatService.inhibitionOfDirectChat();
    this.sendMessageToLoggedUser(0);
    this.getDirectChatData(0);
    event.stopPropagation();
    this.dialogInfoService.setDialogInfoText(9);
    this.dialog.open(DialogInfoComponent);
  }


  sendMessageToLoggedUser(arrayId: number) {
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
