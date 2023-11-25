import { Component, HostListener, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
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
  innerWidth: number = window.innerWidth;

  constructor(
    public dialog: MatDialog,
    public tagChannel: DialogAddService,
    public variableService: VariablesService,
    private thread: DashboardComponentsShowHideService,
  ) {
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.mobileView();
    // console.log(this.innerWidth);
  }

  
  mobileView() {
    let addMember = document.getElementById('addMember');
    if (!this.thread.secondaryChatSlideOut && this.innerWidth <= 951) { addMember.style.display = 'none'}

    if (this.thread.secondaryChatSlideOut || this.innerWidth >= 951) { addMember.style.display = 'flex'}
  }


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
