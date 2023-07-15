import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { TestBastiService } from 'src/app/services/test-basti.service';
import { DashboardComponentsShowHideService } from '../dashboard-components-show-hide.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {


  constructor(private dcshService: DashboardComponentsShowHideService, private dialog : Dialog) { }
  
  openSecondaryChat() {
    this.dcshService.chatSlideIn();
  }

  profileViewUsers() {
    this.dialog.open(DialogProfileViewUsersComponent)
  }

}
