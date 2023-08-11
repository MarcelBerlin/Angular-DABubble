import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { DialogMembersComponent } from 'src/app/dialog/dialog-members/dialog-members.component';
import { MatDialog } from '@angular/material/dialog';
import { VariablesService } from 'src/app/services/variables.service';


@Component({
  selector: 'app-secondary-chat-head',
  templateUrl: './secondary-chat-head.component.html',
  styleUrls: ['./secondary-chat-head.component.scss']
})


export class SecondaryChatHeadComponent {

  channelThread: any = {};
  channels: any = [];
  channelName: any = '';

  constructor(
    private dcshService: DashboardComponentsShowHideService,
    public addService: DialogAddService,
    public varService: VariablesService,
    public dialog: MatDialog) {


    setTimeout(() => {
      this.channelName = addService.tagsData[varService.selectedChannel]?.name.slice(1)
    }, 5000);
  }


  slideOut() {
    this.dcshService.chatSlideOut();
  }


  /**
   * Opens the 'DialogMembersComponent'.
   *
   */
  openChannelOverview() {
    this.dialog.open(DialogMembersComponent);
  }

}
