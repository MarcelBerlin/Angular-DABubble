import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog/dialog-add-channel/dialog-add-channel.component';
import { DialogAddMembersComponent } from 'src/app/dialog/dialog-add-members/dialog-add-members.component';
import { DialogChannelEditionComponent } from 'src/app/dialog/dialog-channel-edition/dialog-channel-edition.component';
import { DialogMembersComponent } from 'src/app/dialog/dialog-members/dialog-members.component';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-main-chat-channel-head',
  templateUrl: './main-chat-channel-head.component.html',
  styleUrls: ['./main-chat-channel-head.component.scss'],
})
export class MainChatChannelHeadComponent {
  hoveredAddIcon: boolean = false;

  constructor(
    public dialog: MatDialog,
    public tagChannel: DialogAddService,
    public variableService: VariablesService,
  ) {}

  /**
   * Opens the 'DialogChannelEditionComponent'.
   *
   */
  channelEdition() {
    this.dialog.open(DialogChannelEditionComponent);
  }

  /**
   * Opens the 'DialogMembersComponent'.
   *
   */
  showMembers() {
    this.dialog.open(DialogMembersComponent);
  }

  /**
   * Opens the 'DialogAddMembersComponent'.
   *
   */
  addMember() {
    this.dialog.open(DialogAddMembersComponent);
  }
}
