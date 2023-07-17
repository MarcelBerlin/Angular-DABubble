import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { TestBastiService } from 'src/app/services/test-basti.service';
import { DashboardComponentsShowHideService } from '../dashboard-components-show-hide.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent {
  hoveredMessagesMainChat: boolean = false;

  constructor(
    private dcshService: DashboardComponentsShowHideService,
    private dialog: Dialog,
    public varService:VariablesService
  ) {}

  openSecondaryChat() {
    this.dcshService.chatSlideIn();
  }

  profileViewUsers() {
    this.dialog.open(DialogProfileViewUsersComponent);
  }
}
