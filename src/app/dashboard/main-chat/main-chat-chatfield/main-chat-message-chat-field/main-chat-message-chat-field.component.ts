import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { ChatService } from 'src/app/services/chat.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DataService } from 'src/app/services/data.service';
import { DirectChatService } from 'src/app/direct-chat/direct-chat.service';

@Component({
  selector: 'app-main-chat-message-chat-field',
  templateUrl: './main-chat-message-chat-field.component.html',
  styleUrls: ['./main-chat-message-chat-field.component.scss'],
})
export class MainChatMessageChatFieldComponent {
  hoveredMessagesMainChat: boolean = false;
  emptyChat: boolean = false;
  chatText: string = '';



  constructor(
    private dcshService: DashboardComponentsShowHideService,
    private dialog: Dialog,
    public varService: VariablesService,
    public dialogAdd: DialogAddService,
    public messageService: MessageService,
    public chatService: ChatService,
    public dataService: DataService,
    public directChatService: DirectChatService
  ) {
  }

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

  onChatTextChanged() {
    this.emptyChat = this.chatText.trim() === '';
  }
}
