import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
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

  
  openMember() {
    this.varService.setVar('selectedUserDetailView',this.varService.selectedUserToMessage)
    this.dialog.open(DialogProfileViewUsersComponent);
  }

  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }

}
