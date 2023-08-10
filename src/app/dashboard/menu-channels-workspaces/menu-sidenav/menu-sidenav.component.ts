import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog/dialog-add-channel/dialog-add-channel.component';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.class';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';

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
  sortedUser: [];
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
    private dcshService: DashboardComponentsShowHideService,
    private directChatService: DirectChatService
  ) {
    this.tags = this.getService.tags;
    this.sortedUser = this.getUserData.userData;
    
  }

  ngOnInit(): void {
    this.allTags();
    // this.getService.deleteFromFirebase() // bitte lassen. Basti
  }

  allTags() {
    const tagCollection = collection(this.firestore, 'tags');
    this.tags$ = collectionData(tagCollection, { idField: 'id' });

    this.tags$.subscribe((data) => {
      this.tags = data;
      // console.log(this.tags); // bitte lassen. Basti
    });
  }

  // sortUser() {
  //   this.sortedUser.sort((, b) => {}
  // }

  toggleChannels() {
    this.channelsVisible = !this.channelsVisible;
    this.channelsPath = this.channelsVisible
      ? 'assets/img/sidenav/channel_open.png'
      : 'assets/img/sidenav/channel_closed.png';
    this.hover ? (this.channelsPath += '_hover') : '';
  }

  hoverChannels() {
    this.hover = true;
    this.channelsPath = this.channelsVisible
      ? 'assets/img/sidenav/channel_open_hover.png'
      : 'assets/img/sidenav/channel_closed_hover.png';
  }

  unhoverChannels() {
    this.hover = false;
    this.channelsPath = this.channelsVisible
      ? 'assets/img/sidenav/channel_open.png'
      : 'assets/img/sidenav/channel_closed.png';
  }

  toggleDirectMessage() {
    this.directMessageUserVisible = !this.directMessageUserVisible;
    this.directMessagePath = this.directMessageUserVisible
      ? 'assets/img/sidenav/direct_message_open.png'
      : 'assets/img/sidenav/direct_message_closed.png';
    this.hover ? (this.directMessagePath += '_hover') : '';
  }

  hoverDirectMessage() {
    this.hover = true;
    this.directMessagePath = this.directMessageUserVisible
      ? 'assets/img/sidenav/direct_message_open.png'
      : 'assets/img/sidenav/direct_message_closed_hover.png';
  }

  unhoverDirectMessage() {
    this.hover = false;
    this.directMessagePath = this.directMessageUserVisible
      ? 'assets/img/sidenav/direct_message_open.png'
      : 'assets/img/sidenav/direct_message_closed.png';
  }

  onClickChannels() {
    this.channelsPath = this.channelsVisible
      ? 'assets/img/sidenav/channel_open_click.png'
      : 'assets/img/sidenav/channel_closed_click.png';
  }

  onClickDirectMessage() {
    this.directMessagePath = this.directMessageUserVisible
      ? 'assets/img/sidenav/direct_message_open_click.png'
      : 'assets/img/sidenav/direct_message_closed_click.png';
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
    this.currentUser()
      ? this.sendMessageToLoggedUser(arrayId)
      : this.sendMessageToSpecificUser(arrayId);
    this.getDirectChatData(arrayId);
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
    this.getService.channelIndex = arrayId;
    this.dcshService.chatSlideIn();
  }

  openNewMessage() {
    this.varService.setVar('mainChatHead', 2);
    this.dcshService.chatSlideOut();
  }

  sendMessageToLoggedUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    this.dcshService.chatSlideOut();
  }

  sendMessageToSpecificUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    this.dcshService.chatSlideOut();
  }

  // Funktion von Bossi. Verbindung zu directChatService
  getDirectChatData(arrayId: number): void {
    if (this.directChatService.directChatActive) {
      let clickedUserId: string = this.getUserData.userData[arrayId].id;
      this.directChatService.getChatId(clickedUserId);
    }
  }

  /**
   * Checks user authorization to display a channel.
   * @param {number} index - The index of the channel in the Service Tags Data list.
   * @returns {boolean} - Returns true if the user is authorized to view the channel, otherwise false.
   */
  authorizationShowChannel(index: number): boolean {
    const loggedUser = this.getUserData.loggedInUserEmail;
    const channel = this.getService.tagsData[index];
    return (
      channel.members.includes(loggedUser) ||
      channel.channelCreator === loggedUser
    );
  }
}
