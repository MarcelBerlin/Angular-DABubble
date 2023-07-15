import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { TestBastiService } from 'src/app/services/test-basti.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {


  constructor(private tBS: TestBastiService, private dialog : Dialog) { }
  
  openSecondaryChat() {
    this.tBS.chatSlideIn();
  }

  profileViewUsers() {
    this.dialog.open(DialogProfileViewUsersComponent)
  }

}
