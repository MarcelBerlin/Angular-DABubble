import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';


@Component({
  selector: 'app-main-chat-channel-chat-field',
  templateUrl: './main-chat-channel-chat-field.component.html',
  styleUrls: ['./main-chat-channel-chat-field.component.scss']
})
export class MainChatChannelChatFieldComponent {
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
