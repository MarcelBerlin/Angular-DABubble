import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogChannelEditionComponent } from 'src/app/dialog/dialog-channel-edition/dialog-channel-edition.component';
import { DialogMembersComponent } from 'src/app/dialog/dialog-members/dialog-members.component';
import { TestBastiService } from 'src/app/services/test-basti.service';

@Component({
  selector: 'app-main-chat-channel-head',
  templateUrl: './main-chat-channel-head.component.html',
  styleUrls: ['./main-chat-channel-head.component.scss']
})
export class MainChatChannelHeadComponent {
  constructor(public dialog: MatDialog, public tBS: TestBastiService) {}

  channelEdition() {
    this.dialog.open(DialogChannelEditionComponent);
  }

  showMembers() {
    this.dialog.open(DialogMembersComponent);
  }

}
