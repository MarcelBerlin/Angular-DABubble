import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';

@Component({
  selector: 'app-main-chat-message-chat-field',
  templateUrl: './main-chat-message-chat-field.component.html',
  styleUrls: ['./main-chat-message-chat-field.component.scss'],
})
export class MainChatMessageChatFieldComponent {
  hoveredMessagesMainChat: boolean = false;

  constructor(
    private dcshService: DashboardComponentsShowHideService,
    private dialog: Dialog
  ) {}

  openSecondaryChat() {
    this.dcshService.chatSlideIn();
  }

  profileViewUsers() {
    this.dialog.open(DialogProfileViewUsersComponent);
  }
}
