import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-dialog-profile-view-users',
  templateUrl: './dialog-profile-view-users.component.html',
  styleUrls: ['./dialog-profile-view-users.component.scss'],
})
export class DialogProfileViewUsersComponent {
  online: boolean = false;

  constructor(
    private dialogRef: DialogRef,
    public dataService: DataService,
    public varService: VariablesService,
    private dcshService: DashboardComponentsShowHideService
  ) {}

  /**
   * Closes the current dialog.
   *
   * This method is responsible for closing the dialog that is associated with the current component.
   * It uses the 'dialogRef' property, representing the reference to the current dialog, to close it.
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Handles the action when a user initiates a message.
   *
   * This method is responsible for the necessary actions when a user wants to send a message.
   * It sets the 'mainChatHead' variable in 'varService' to true to show the message input box.
   * Then, it closes the current dialog ('dialogRef') before proceeding to handle the message action.
   * The 'selectedUserToMessage' variable in 'varService' is set to the 'selectedUserDetailView' to set the recipient of the message.
   * Finally, it triggers the 'chatSlideOut' method of 'dcshService' to slide out the chat interface.
   */
  message() {
    this.varService.setVar('mainChatHead', 1);
    this.dialogRef.close();
    this.varService.setVar(
      'selectedUserToMessage',
      this.varService.selectedUserDetailView
    );
    this.dcshService.chatSlideOut();
  }
}
