import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { DialogMembersComponent } from 'src/app/dialog/dialog-members/dialog-members.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-secondary-chat-head',
  templateUrl: './secondary-chat-head.component.html',
  styleUrls: ['./secondary-chat-head.component.scss']
})


export class SecondaryChatHeadComponent {

  channelThread: any = {};
  channels: any = [];


  constructor(
    private dcshService: DashboardComponentsShowHideService,
    public channelService: DialogAddService,
    public dialog: MatDialog
  ) {

    setTimeout(() => {
      this.channels = this.channelService.tagsData;
    }, 1000);

  }


  slideOut() {
    this.dcshService.chatSlideOut()
  }


  /**
   * Opens the 'DialogMembersComponent'.
   *
   */
  openChannelOverview() {
    this.dialog.open(DialogMembersComponent);
  }

}
