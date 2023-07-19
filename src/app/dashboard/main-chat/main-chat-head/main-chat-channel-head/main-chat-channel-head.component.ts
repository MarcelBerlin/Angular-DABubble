import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuSidenavComponent } from 'src/app/dashboard/menu-channels-workspaces/menu-sidenav/menu-sidenav.component';
import { DialogAddMembersComponent } from 'src/app/dialog/dialog-add-members/dialog-add-members.component';
import { DialogChannelEditionComponent } from 'src/app/dialog/dialog-channel-edition/dialog-channel-edition.component';
import { DialogMembersComponent } from 'src/app/dialog/dialog-members/dialog-members.component';
import { TestBastiService } from 'src/app/services/test-basti.service';
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
    public tBS: TestBastiService,
    public tagChannel: MenuSidenavComponent,
    public variableService: VariablesService

  ) { }

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
