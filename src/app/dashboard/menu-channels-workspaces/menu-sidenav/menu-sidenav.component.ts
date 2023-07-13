import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog-add-channel/dialog-add-channel.component';
import { DialogAddService } from 'src/app/services/dialog-add.service';



@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],  
  animations: [
    trigger('tagAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('visible <=> hidden', animate('175ms ease-in-out'))
    ])
  ]
})

export class MenuSidenavComponent implements OnInit {

  tags: any;
  tagState = 'visible';

  newMessagePath: string = 'assets/img/sidenav/newMessage.png';
  channelsPath: string = 'assets/img/sidenav/channel_closed.png';
  addPathChannel: string = 'assets/img/sidenav/add.png';
  addPathMessage: string = 'assets/img/sidenav/add.png';
  firstTagPath: string = 'assets/img/sidenav/tag.png';
  secondTagPath: string = 'assets/img/sidenav/tag.png';
  thirdTagPath: string = 'assets/img/sidenav/tag.png';
  directMessagePath: string = 'assets/img/sidenav/direct_message_closed.png';

  channelsVisible: boolean = true;
  directMessageUserVisible: boolean = true;
   

  constructor(public dialog: MatDialog, public getService: DialogAddService) {
    this.tags = this.getService.tags
  }

  ngOnInit(): void {
    
  }

  toggleChannels() {
    this.channelsVisible = !this.channelsVisible;
  }

  toggleDirectMessage() {
    this.directMessageUserVisible = !this.directMessageUserVisible;
  }
 
  addChannel() {
    this.dialog.open(DialogAddChannelComponent)
  }

}
