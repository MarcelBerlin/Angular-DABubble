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
import { ConditionService } from 'src/app/services/condition.service';
import { MessageToUserService } from 'src/app/direct-chat/services/message-to-user.service';

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
  channelID: string = '';
  selChannelMessageAmount: number;
  channelsVisible: boolean = true;
  hover: boolean = false;
  directMessageUserVisible: boolean = true;
  innerWidth: number = window.innerWidth;
  selectedChannelIndex: number = -1;

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
    public conditionService: ConditionService,
    public messageToUserService: MessageToUserService
  ) {
    this.tags = this.getService.tags;
    this.sortedUser = this.getUserData.userData;
  }

  /**
   * Executes when the component is initialized.
   * Calls the 'allTags' method and performs some specific action.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.allTags();
    // this.getService.deleteFromFirebase('') // bitte lassen. Basti
  }

  /**
   * Listens for the window resize event and updates the innerWidth property accordingly.
   *
   * @param {Event} event - The resize event object.
   * @returns {void}
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  /**
   * Fetches all tags from the 'tags' collection in Firestore and subscribes to changes.
   * Updates the 'tags' property and logs the retrieved tags (for debugging purposes).
   *
   * @returns {void}
   */
  allTags():void {
    const tagCollection = collection(this.firestore, 'tags');
    this.tags$ = collectionData(tagCollection, { idField: 'id' });
    this.tags$.subscribe((data) => {
      this.tags = data;
    });
  }

  /**
   * Toggles the visibility of channels and updates related properties.
   * Updates 'channelsVisible' to its opposite value and changes 'channelArrow' accordingly.
   * Also toggles 'arrowStateChannel' and logs 'channelsVisible' for debugging.
   *
   * @returns {void}
   */
  toggleChannels():void {
    this.channelsVisible = !this.channelsVisible;
    this.channelArrow = this.channelsVisible
      ? 'assets/img/sidenav/arrow_down.png'
      : 'assets/img/sidenav/arrow_left.png';
    this.arrowStateChannel = !this.arrowStateChannel;
  }

  /**
   * Handles hover effects for channels.
   * Updates properties related to channel hover state and visuals.
   *
   * @returns {void}
   */
  hoverChannels() {
    this.hover = true;
    if (!this.arrowStateChannel) {
      this.channelArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_left_blue.png'
        : 'assets/img/sidenav/arrow_left_blue.png';
    } else {
      this.channelArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_down_blue.png'
        : 'assets/img/sidenav/arrow_down_blue.png';
    }
    this.channelLogo = this.channelsVisible
      ? 'assets/img/sidenav/circles_blue.png'
      : 'assets/img/sidenav/circles_blue.png';
  }

  /**
   * Handles the removal of hover effects for channels.
   * Resets properties related to channel hover state and visuals.
   *
   * @returns {void}
   */
  unhoverChannels() {
    this.hover = false;
    if (!this.arrowStateChannel) {
      this.channelArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_left.png'
        : 'assets/img/sidenav/arrow_left.png';
    } else {
      this.channelArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_down.png'
        : 'assets/img/sidenav/arrow_down.png';
    }
    this.channelLogo = this.channelsVisible
      ? 'assets/img/sidenav/circles.png'
      : 'assets/img/sidenav/circles.png';
  }

  /**
   * Toggles the visibility of direct messages for users.
   * Updates 'directMessageUserVisible' to its opposite value and changes 'chatArrow' accordingly.
   * Also toggles 'arrowStateMessage'.
   *
   * @returns {void}
   */
  toggleDirectMessage() {
    this.directMessageUserVisible = !this.directMessageUserVisible;
    this.chatArrow = this.directMessageUserVisible
      ? 'assets/img/sidenav/arrow_down.png'
      : 'assets/img/sidenav/arrow_left.png';
    this.arrowStateMessage = !this.arrowStateMessage;
  }

  /**
   * Handles hover effects for direct messages.
   * Updates properties related to direct message hover state and visuals.
   *
   * @returns {void}
   */
  hoverDirectMessage() {
    this.hover = true;
    if (!this.arrowStateMessage) {
      this.chatArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_left_blue.png'
        : 'assets/img/sidenav/arrow_left_blue.png';
    } else {
      this.chatArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_down_blue.png'
        : 'assets/img/sidenav/arrow_down_blue.png';
    }
    this.chatLogo = this.channelsVisible
      ? 'assets/img/sidenav/account_blue.png'
      : 'assets/img/sidenav/account_blue.png';
  }

  /**
   * Handles the removal of hover effects for direct messages.
   * Resets properties related to direct message hover state and visuals.
   *
   * @returns {void}
   */
  unhoverDirectMessage() {
    this.hover = false;
    if (!this.arrowStateMessage) {
      this.chatArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_left.png'
        : 'assets/img/sidenav/arrow_left.png';
    } else {
      this.chatArrow = this.channelsVisible
        ? 'assets/img/sidenav/arrow_down.png'
        : 'assets/img/sidenav/arrow_down.png';
    }
    this.chatLogo = this.channelsVisible
      ? 'assets/img/sidenav/account.png'
      : 'assets/img/sidenav/account.png';
  }

  /**
   * Handles hover effects for the add channel button.
   * Updates the 'addNewChannel' property based on the 'channelsVisible' state.
   *
   * @returns {void}
   */
  hoverAddChannel() {
    this.addNewChannel = this.channelsVisible
      ? 'assets/img/sidenav/add_circle_blue.png'
      : 'assets/img/sidenav/add_circle_blue.png';
  }

  /**
   * Handles the removal of hover effects for the add channel button.
   * Resets the 'addNewChannel' property to its default state based on 'channelsVisible'.
   *
   * @returns {void}
   */
  unhoverAddChannel() {
    this.addNewChannel = this.channelsVisible
      ? 'assets/img/sidenav/add_circle.png'
      : 'assets/img/sidenav/add_circle.png';
  }

  /**
   * Opens a dialog to add a new channel.
   * Utilizes the MatDialog service to open the 'DialogAddChannelComponent'.
   *
   * @returns {void}
   */
  addChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  /**
   * Deletes a tag from the view and Firestore database.
   *
   * @param {Tag} tag - The tag to be deleted.
   * @returns {void}
   */
  deleteTag(tag: Tag) {
    // Löschen des Tags aus der HTML-Ansicht
    this.getService.tags = this.getService.tags.filter((t) => t !== tag);

    // Löschen des Tags aus der Firestore-Datenbank
    // this.getService.deleteFromFirebase(tag);
  }

  /**
   * Opens a channel based on its ID, updating various service and UI-related variables.
   *
   * @param {number} arrayId - The ID of the channel in the array.
   * @returns {Promise<void>}
   */
  async openChannel(arrayId: number) {
    this.varService.setVar('mainChatHead', 0);
    this.varService.setVar('selectedChannel', arrayId);
    this.getService.channelIndex = arrayId;
    this.selectedChannelIndex = arrayId;
    this.dcshService.chatSlideOut();
    const selectedChannel = this.tags[arrayId];
    this.messageInputService.chatChange = true;
    this.messageInputService.placeholderUserName = selectedChannel.name;
    this.messageInputService.placeholderText =
      'Nachricht an ' + selectedChannel.name;
    this.messageInputService.setMyVariable(true);
    const channelId = selectedChannel.id;
    this.channelMessageService.currentChannelId = channelId;
    this.channelMessageService.MessageAmount =
      selectedChannel.channelMessageAmount;
    if (innerWidth <= 800) {
      this.dcshService.hideNavigation = true;
    }
    await this.messageService.onChannelClick(channelId);
  }

  /**
   * Opens a new message window, updating UI-related variables.
   *
   * @returns {void}
   */
  openNewMessage() {
    this.varService.setVar('mainChatHead', 2);
    this.dcshService.chatSlideOut();
    if (innerWidth <= 800) {
      this.dcshService.hideNavigation = true;
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
