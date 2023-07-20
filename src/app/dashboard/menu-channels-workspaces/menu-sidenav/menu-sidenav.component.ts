import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog-add-channel/dialog-add-channel.component';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.class';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';

interface Tag {
  id: string;
  name: string;
  imagePath: string;
  description: string;
}

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
  animations: [
    trigger('tagAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('visible <=> hidden', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MenuSidenavComponent implements OnInit {
  tags$: Observable<any[]>;
  user$: Observable<any[]>;  
  tags: any;
  tagState = 'visible';

  newMessagePath: string = 'assets/img/sidenav/newMessage.png';
  channelsPath: string = 'assets/img/sidenav/channel_open.png';
  addPathChannel: string = 'assets/img/sidenav/add.png';
  addPathMessage: string = 'assets/img/sidenav/add.png';
  addNewChannel: string = 'assets/img/sidenav/add_Channel.png';
  firstTagPath: string = 'assets/img/sidenav/tag.png';
  secondTagPath: string = 'assets/img/sidenav/tag.png';
  thirdTagPath: string = 'assets/img/sidenav/tag.png';
  directMessagePath: string = 'assets/img/sidenav/direct_message_closed.png';

  channelsVisible: boolean = true;
  hover: boolean = false;
  directMessageUserVisible: boolean = true;
  

  constructor(
    public dialog: MatDialog,
    public getService: DialogAddService,
    private firestore: Firestore,
    public getUserData: DataService,
    public varService: VariablesService,
    private dcshService:DashboardComponentsShowHideService
  ) {
    this.tags = this.getService.tags;
    
  }

  ngOnInit(): void {
    this.allTags();
    
  }

  allTags() {
    const tagCollection = collection(this.firestore, 'tags');
    this.tags$ = collectionData(tagCollection, { idField: 'id' });

    this.tags$.subscribe((data) => {
      this.tags = data;      
    });
  }


  toggleChannels() {
    this.channelsVisible = !this.channelsVisible;

    if (this.channelsVisible) {
      this.channelsPath = 'assets/img/sidenav/channel_open.png';
    } else {
      this.channelsPath = 'assets/img/sidenav/channel_closed.png';
    }

    if (this.hover) {
      this.channelsPath += '_hover';
    }
  }

  hoverChannels() {
    this.hover = true;

    if (this.channelsVisible) {
      this.channelsPath = 'assets/img/sidenav/channel_open_hover.png';
    } else {
      this.channelsPath = 'assets/img/sidenav/channel_closed_hover.png';
    }
  }

  unhoverChannels() {
    this.hover = false;

    if (this.channelsVisible) {
      this.channelsPath = 'assets/img/sidenav/channel_open.png';
    } else {
      this.channelsPath = 'assets/img/sidenav/channel_closed.png';
    }

   }

  toggleDirectMessage() {
    this.directMessageUserVisible = !this.directMessageUserVisible;

    if (this.directMessageUserVisible) {
      this.directMessagePath = 'assets/img/sidenav/direct_message_open.png';
    } else {
      this.directMessagePath = 'assets/img/sidenav/direct_message_closed.png';
    }

    if (this.hover) {
      this.directMessagePath += '_hover';
    }
  }

  hoverDirectMessage() {
    this.hover = true;

    if (this.directMessageUserVisible) {
      this.directMessagePath =
        'assets/img/sidenav/direct_message_open_hover.png';
    } else {
      this.directMessagePath =
        'assets/img/sidenav/direct_message_closed_hover.png';
    }
  }

  unhoverDirectMessage() {
    this.hover = false;

    if (this.directMessageUserVisible) {
      this.directMessagePath = 'assets/img/sidenav/direct_message_open.png';
    } else {
      this.directMessagePath = 'assets/img/sidenav/direct_message_closed.png';
    }
  }

  onClickChannels() {
    if (this.channelsVisible) {
      this.channelsPath = 'assets/img/sidenav/channel_open_click.png';
    } else {
      this.channelsPath = 'assets/img/sidenav/channel_closed_click.png';
    }
  }

  onClickDirectMessage() {
    if (this.directMessageUserVisible) {
      this.directMessagePath =
        'assets/img/sidenav/direct_message_open_click.png';
    } else {
      this.directMessagePath =
        'assets/img/sidenav/direct_message_closed_click.png';
    }
  }

  addChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }
  

  deleteTag(tag: Tag) {
    // Löschen des Tags aus der HTML-Ansicht
    this.getService.tags = this.getService.tags.filter((t) => t !== tag);

    // Löschen des Tags aus der Firestore-Datenbank
    // this.getService.deleteTagFromFirestore(tag);
  }

  messageToUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    this.dcshService.chatSlideOut()

  }

  currentUser() {
    return (
      this.getUserData.loggedInUserData.email ===
      this.getUserData.userData[this.varService.selectedUserToMessage].email
    );
  }


  openChannel(arrayId: number) {    
    this.varService.setVar('mainChatHead', 0);
    this.varService.setVar('selectedChannel', arrayId);
  }

  openNewMessage() {
    console.log('Button funktioniert. mainChatHead ist auf 2 gesetzt');
    this.varService.setVar('mainChatHead', 2);
    this.dcshService.chatSlideOut()
  }
}
