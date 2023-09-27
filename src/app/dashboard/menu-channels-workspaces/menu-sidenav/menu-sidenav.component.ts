import { Component, HostListener, OnInit } from '@angular/core';
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
import { MessageService } from 'src/app/services/messages.service';
import { NewMessageAmountService } from 'src/app/direct-chat/services/new-message-amount.service';
import { ChannelMessagesService } from '../../main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-messages.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';


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
  channelArrow: string = 'assets/img/sidenav/arrow_down.png';
  channelLogo: string = 'assets/img/sidenav/circles.png';
  chatArrow: string = 'assets/img/sidenav/arrow_down.png';
  chatLogo: string = 'assets/img/sidenav/account.png';
  addPathChannel: string = 'assets/img/sidenav/add.png';
  addPathMessage: string = 'assets/img/sidenav/add.png';
  addNewChannel: string = 'assets/img/sidenav/add_circle.png';
  firstTagPath: string = 'assets/img/sidenav/tag.png';
  secondTagPath: string = 'assets/img/sidenav/tag.png';
  thirdTagPath: string = 'assets/img/sidenav/tag.png';
  arrowStateChannel: boolean = true;
  arrowStateMessage: boolean = true;


  channelsVisible: boolean = true;
  hover: boolean = false;
  directMessageUserVisible: boolean = true;
  innerWidth: number;

  constructor(
    public dialog: MatDialog,
    public getService: DialogAddService,
    private firestore: Firestore,
    public getUserData: DataService,
    public varService: VariablesService,
    private dcshService: DashboardComponentsShowHideService,
    public directChatService: DirectChatService,
    public newMessageAmountService: NewMessageAmountService,
    public messageService: MessageService,
    private channelMessageService: ChannelMessagesService,
    private messageInputService: MessageInputServiceService,

  ) {
    this.tags = this.getService.tags;
    this.sortedUser = this.getUserData.userData;

  }

  ngOnInit(): void {
    this.allTags();
    // this.getService.deleteFromFirebase() // bitte lassen. Basti
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
  }

  allTags() {
    const tagCollection = collection(this.firestore, 'tags');
    this.tags$ = collectionData(tagCollection, { idField: 'id' });

    this.tags$.subscribe((data) => {
      this.tags = data;
      //   console.log(this.tags); // bitte lassen. Basti
      // console.log(this.getUserData.userData); // bitte lassen. Basti

    });
  }

  // sortUser() {
  //   this.sortedUser.sort((, b) => {}
  // }

  toggleChannels() {
    this.channelsVisible = !this.channelsVisible;
    this.channelArrow = this.channelsVisible
      ? 'assets/img/sidenav/arrow_down.png'
      : 'assets/img/sidenav/arrow_left.png';
    // this.hover ? (this.channelArrow += '_hover') : '';
    console.log(this.channelsVisible);
    this.arrowStateChannel = !this.arrowStateChannel;
  }


  hoverChannels() {
    this.hover = true;
    if (!this.arrowStateChannel) {
      this.channelArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_left_blue.png' : 'assets/img/sidenav/arrow_left_blue.png'
    } else {
      this.channelArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_down_blue.png' : 'assets/img/sidenav/arrow_down_blue.png'
    }
    this.channelLogo = this.channelsVisible ? 'assets/img/sidenav/circles_blue.png' : 'assets/img/sidenav/circles_blue.png'
  }

  unhoverChannels() {
    this.hover = false;
    if (!this.arrowStateChannel) {
      this.channelArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_left.png' : 'assets/img/sidenav/arrow_left.png';
    } else {
      this.channelArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_down.png' : 'assets/img/sidenav/arrow_down.png';
    }
    this.channelLogo = this.channelsVisible ? 'assets/img/sidenav/circles.png' : 'assets/img/sidenav/circles.png';
  }

  toggleDirectMessage() {
    this.directMessageUserVisible = !this.directMessageUserVisible;
    this.chatArrow = this.directMessageUserVisible
      ? 'assets/img/sidenav/arrow_down.png'
      : 'assets/img/sidenav/arrow_left.png';
    // this.hover ? (this.chatLogo += '_hover') : '';
    this.arrowStateMessage = !this.arrowStateMessage;
  }

  hoverDirectMessage() {
    this.hover = true;
    if (!this.arrowStateMessage) {
      this.chatArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_left_blue.png' : 'assets/img/sidenav/arrow_left_blue.png'
    } else {
      this.chatArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_down_blue.png' : 'assets/img/sidenav/arrow_down_blue.png'
    }
    this.chatLogo = this.channelsVisible ? 'assets/img/sidenav/account_blue.png' : 'assets/img/sidenav/account_blue.png'
  }

  unhoverDirectMessage() {
    this.hover = false;
    if (!this.arrowStateMessage) {
      this.chatArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_left.png' : 'assets/img/sidenav/arrow_left.png';
    } else {
      this.chatArrow = this.channelsVisible ? 'assets/img/sidenav/arrow_down.png' : 'assets/img/sidenav/arrow_down.png';
    }
    this.chatLogo = this.channelsVisible ? 'assets/img/sidenav/account.png' : 'assets/img/sidenav/account.png';
  }

  hoverAddChannel() {
    this.addNewChannel = this.channelsVisible ? 'assets/img/sidenav/add_circle_blue.png' : 'assets/img/sidenav/add_circle_blue.png'
  }

  unhoverAddChannel() {
    this.addNewChannel = this.channelsVisible ? 'assets/img/sidenav/add_circle.png' : 'assets/img/sidenav/add_circle.png'
  }

  // onClickChannels() {
  //   this.channelArrow = this.channelsVisible
  //     ? 'assets/img/sidenav/arrow_down_blue.png'
  //     : 'assets/img/sidenav/arrow_left_blue.png';
  // }

  // onClickDirectMessage() {
  //   this.chatArrow = this.directMessageUserVisible
  //     ? 'assets/img/sidenav/arrow_down.png'
  //     : 'assets/img/sidenav/arrow_left.png';

  //   this.chatLogo = this.directMessageUserVisible
  //     ? 'assets/img/sidenav/account_blue.png'
  //     : 'assets/img/sidenav/account.png';
  // }

  addChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  deleteTag(tag: Tag) {
    // Löschen des Tags aus der HTML-Ansicht
    this.getService.tags = this.getService.tags.filter((t) => t !== tag);

    // Löschen des Tags aus der Firestore-Datenbank
    // this.getService.deleteFromFirebase(tag);
  }

  messageToUser(arrayId: number) {
    this.currentUser()
      ? this.sendMessageToLoggedUser(arrayId)
      : this.sendMessageToSpecificUser(arrayId);
    this.varService.previousScrollTop = 0; // important for the autoscroll functionality
    this.getDirectChatData(arrayId);
  }

  currentUser() {
    return (
      this.getUserData.loggedInUserData.email ===
      this.getUserData.userData[this.varService.selectedUserToMessage].email
    );
  }

  async openChannel(arrayId: number) {
    this.varService.setVar('mainChatHead', 0);
    this.varService.setVar('selectedChannel', arrayId);
    this.getService.channelIndex = arrayId;
    this.dcshService.chatSlideOut();
    const selectedChannel = this.tags[arrayId];
    const channelId = selectedChannel.id;
    this.channelMessageService.selectedChannelId = channelId;
    await this.messageService.onChannelClick(channelId);
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


  /**
   * Retrieves direct chat data for the user at the specified index in the user data array.
   * If a direct chat is active, it sets the chat ID, updates the new message amount index, 
   * and resets the own message amount to zero after a delay.
   * 
   * @param {number} arrayId - The index of the user in the user data array.
   * @returns {void}
   */
  getDirectChatData(arrayId: number): void {
    if (this.directChatService.directChatActive) {
      this.messageInputService.chatChange = true;
      const clickedUserId: string = this.getUserData.userData[arrayId].id;
      const clickedUserName: string = this.getUserData.userData[arrayId].name;
      this.messageInputService.placeholderUserName = clickedUserName; 
      this.messageInputService.placeholderText = 'Nachricht an ' + clickedUserName;
      this.directChatService.getChatId(clickedUserId);
      this.newMessageAmountService.actualPartnerUserDataIndex = arrayId;
      this.messageInputService.setMyVariable(true);
      setTimeout(() => {
        this.newMessageAmountService.setOwnMessageAmountToZero();
      }, 1000);
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
