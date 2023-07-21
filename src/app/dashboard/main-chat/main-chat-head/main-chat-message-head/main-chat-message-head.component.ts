import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { HeaderDialogComponent } from 'src/app/dialog/header-dialog/header-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';

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
    public varService: VariablesService
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
}
