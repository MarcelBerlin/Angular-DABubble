import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogChannelEditionComponent } from 'src/app/dialog/dialog-channel-edition/dialog-channel-edition.component';

@Component({
  selector: 'app-main-chat-head',
  templateUrl: './main-chat-head.component.html',
  styleUrls: ['./main-chat-head.component.scss']
})
export class MainChatHeadComponent {

constructor(public dialog: MatDialog){}

  channelEdition() {
    this.dialog.open(DialogChannelEditionComponent)
  }
}
