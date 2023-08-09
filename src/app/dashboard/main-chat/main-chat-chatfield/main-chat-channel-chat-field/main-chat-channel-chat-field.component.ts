import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from '../../../dashboard-components-show-hide.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { VariablesService } from 'src/app/services/variables.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';

@Component({
  selector: 'app-main-chat-channel-chat-field',
  templateUrl: './main-chat-channel-chat-field.component.html',
  styleUrls: ['./main-chat-channel-chat-field.component.scss'],
})
export class MainChatChannelChatFieldComponent {
  hoveredMessagesMainChat: boolean = false;

  constructor(
    private dcshService: DashboardComponentsShowHideService,
    private dialog: Dialog,
    public varService: VariablesService,
  ) {}

  /**
   * Opens the secondary chat by invoking the 'chatSlideIn' method of the 'dcshService'.
   *
   * This method is responsible for triggering the slide-in animation of the secondary chat.
   */
  openSecondaryChat() {
    this.dcshService.chatSlideIn();
  }

  /**
   * Opens the 'DialogProfileViewUsersComponent' dialog to display user profiles.
   *
   * This method is responsible for triggering the dialog to show user profiles in a view.
   * The 'DialogProfileViewUsersComponent' is used for rendering the user profile details.
   */
  profileViewUsers() {
    this.dialog.open(DialogProfileViewUsersComponent);
  }
}
