import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMembersComponent } from 'src/app/dialog/dialog-add-members/dialog-add-members.component';
import { DialogChannelEditionComponent } from 'src/app/dialog/dialog-channel-edition/dialog-channel-edition.component';
import { DialogMembersComponent } from 'src/app/dialog/dialog-members/dialog-members.component';
import { TestBastiService } from 'src/app/services/test-basti.service';

@Component({
  selector: 'app-main-chat-channel-head',
  templateUrl: './main-chat-channel-head.component.html',
  styleUrls: ['./main-chat-channel-head.component.scss']
})
export class MainChatChannelHeadComponent {
  hoveredAddIcon:boolean = false;
  constructor(public dialog: MatDialog, public tBS: TestBastiService) {}

  channelEdition() {
    this.dialog.open(DialogChannelEditionComponent);
  }

  showMembers() {
    this.dialog.open(DialogMembersComponent);
  }

  addMember() {
    this.dialog.open(DialogAddMembersComponent);
  }

}
