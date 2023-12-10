import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  where,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Messages } from '../models/messages.interface';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DialogAddService } from './dialog-add.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { VariablesService } from './variables.service';
import { DashboardComponentsShowHideService } from '../dashboard/dashboard-components-show-hide.service';
import { ChannelTimeStamp } from '../dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/models/channel-timestamp.class';
import { DirectChatServiceService } from '../direct-chat/services/direct-chat-service.service';
import { ChannelTimestampService } from '../dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-timestamp.service';
import { ChannelMessagesService } from '../dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-messages.service';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  index: number;
  messages$: any = [];
  messageData: any = [];
  channelMessages: any = [];
  newMessage: Messages = new Messages();
  groupedMessages: { [key: string]: any[] } = {};
  messageText: string = '';
  messageId: string = 'unset';
  selectedChannel: string = '';
  emojis: any = [];
  tags: any;
  dateString: string = '';
  private emptyChatSubject = new Subject<boolean>();
  emptyChat$ = this.emptyChatSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private dataService: DataService,
    private dialogAddService: DialogAddService,
    private directChatService: DirectChatService,
    public varService: VariablesService,
    private dcshService: DashboardComponentsShowHideService,
    private channelTimestampService: ChannelTimestampService,
    private channelMessagesService: ChannelMessagesService
  ) {}

  /**
   * Adds a new message and performs a series of operations
   * to process the message and insert it into the appropriate data structures.
   *
   * @function addMessage
   * @memberof MessageService
   * @returns {void}
   */
  async addMessage() {
    this.UserAndMessageDetails();
    this.addTimeStampToMessage();
    this.saveMessageWithIdToDoc();
    this.channelMessagesService.getChannelMessageFromFirestore();
    this.messageData.push(this.newMessage);
    this.dialogAddService.channelMessage.push(this.newMessage);
    this.messageText = '';
  }

  /**
   * sets the user and message details like channelID, userId, userName and so on
   *
   * @function UserAndMessageDetails
   * @memberof MessageService
   * @returns {void}
   */
  UserAndMessageDetails() {
    this.newMessage.channelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.varService.selectedChannelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newMessage.userId = this.dataService.loggedInUserData.userId;
    this.newMessage.userName = this.dataService.loggedInUserData.name;
    this.newMessage.userImg = this.dataService.loggedInUserData.img;
  }

  /**
   * add the actual date and clocktime to the message
   *
   * @function addTimeStampToMessage
   * @memberof MessageService
   * @returns {void}
   */
  addTimeStampToMessage() {
    const timeStampData: ChannelTimeStamp =
      this.channelTimestampService.getActualTimeStampForChannels();
    this.newMessage.dateTimeNumber = timeStampData.dateTimeNumber;
    this.newMessage.dateString = timeStampData.dateString;
    this.dateString = this.newMessage.dateString;
    this.newMessage.clockString = timeStampData.clockString;
  }

  /**
   * saves the message with an individual ID to firestore
   *
   * @function saveMessageWithIdToDoc
   * @memberof MessageService
   * @returns {void}
   */
  async saveMessageWithIdToDoc() {
    const coll = collection(this.firestore, 'newMessages'); // definiert die Collection, worauf man zugreifen möchte
    try {
      let docId = await addDoc(coll, this.newMessage.toJSON()); // generiert für das Dokument eine eigene ID in Firestore
      this.newMessage.messageId = docId.id; // die DokumentID wird auf die Variable messageID gesetzt.
      this.updateIdToMessageCollection(); // funktion zum Updaten der Dokumenten ID in die Collection selbst, damit später darauf zugegriffen werden kann.
    } catch (error) {
      console.log('update Id to doc failed!!');
    }
  }

  /**
   *  Updates the messageId in the message collection with the newMessage's messageId.
   *
   * @function updateIdToMessageCollection
   * @memberof MessageService
   * @returns {void}
   */
  updateIdToMessageCollection(): void {
    const qData = doc(this.firestore, 'newMessages', this.newMessage.messageId);
    const newData = { messageId: this.newMessage.messageId };
    try {
      updateDoc(qData, newData);
    } catch (error) {
      console.log('update doc failed!!');
    }
  }

  /**
   * Loads channel messages from Firestore based on the provided channelId.
   * 
   * @function loadChannelMessages
   * @memberof MessageService
   * @param {string} channelId - The ID of the channel to load messages for.
   * @returns {Promise<void>} - A promise that resolves once messages are loaded.
   */
  async loadChannelMessages(channelId: string) {
    const coll = collection(this.firestore, 'messages');
    const q = query(coll, where('channelId', '==', channelId));
    const messages = await getDocs(q);
    this.messageData = messages.docs.map((doc) => doc.data());
  }

  /**
   * Handles the click event for a channel by setting the selected channel ID
   * and loading messages for the corresponding channel.
   * 
   * @function onChannelClick
   * @memberof MessageService
   * @param {string} channelId - The ID of the clicked channel.
   * @returns {Promise<void>} - A promise that resolves once messages for the channel are loaded.
   */
  async onChannelClick(channelId: string) {
    this.varService.selectedChannelId = channelId;
    await this.loadChannelMessages(channelId);
  }

  /**
   * Sets the message data to the provided index.
   * 
   * @function privateAnswer
   * @memberof YourClassName
   * @param {number} index - The index to set as the message data.
   * @returns {void}
   */
  privateAnswer(index: number) {
    this.messageData = index;
  }


  /**
   * Sends a message to a user based on their array index,
   * determines the recipient based on the current user's status,
   * and retrieves data for direct chat.
   * 
   * @function messageToUser
   * @memberof MessageService
   * @param {number} arrayId - The index of the user in the array.
   * @returns {void}
   */
  messageToUser(arrayId: number) {
    this.currentUser()
      ? this.sendMessageToLoggedUser(arrayId)
      : this.sendMessageToSpecificUser(arrayId);
    this.varService.previousScrollTop = 0; // important for the autoscroll functionality
    this.getDirectChatData(arrayId);
  }

  /**
   * Checks if the currently logged-in user matches the selected user for messaging.
   * 
   * @function currentUser
   * @memberof MessageService
   * @returns {boolean} - Indicates whether the current user matches the selected user for messaging.
   */
  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }

  /**
   * Sets variables and triggers UI changes for sending a message to the logged-in user.
   * 
   * @function sendMessageToLoggedUser
   * @memberof MessageService
   * @param {number} arrayId - The index of the user in the array.
   * @returns {void}
   */
  sendMessageToLoggedUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    this.dcshService.chatSlideOut();
  }

  /**
   * Sets variables and triggers UI changes for sending a message to a specific user.
   * 
   * @function sendMessageToSpecificUser
   * @memberof MessageService
   * @param {number} arrayId - The index of the user in the array.
   * @returns {void}
   */
  sendMessageToSpecificUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    this.dcshService.chatSlideOut();
  }

  /**
   * Retrieves data for direct chat based on the provided user's array index.
   * 
   * @function getDirectChatData
   * @memberof MessageService
   * @param {number} arrayId - The index of the user in the array.
   * @returns {void}
   */
  getDirectChatData(arrayId: number): void {
    if (this.directChatService.directChatActive) {
      let clickedUserId: string = this.dataService.userData[arrayId].id;     
      this.directChatService.getChatId(clickedUserId);
    }
  }

  /**
   * Opens a channel identified by its array index, sets variables and triggers UI changes.
   * 
   * @function openChannel
   * @memberof MessageService
   * @param {number} arrayId - The index of the channel in the array.
   * @returns {Promise<void>} - A promise that resolves once the channel is opened.
   */
  async openChannel(arrayId: number) {
    this.varService.setVar('mainChatHead', 0);
    this.varService.setVar('selectedChannel', arrayId);
    this.dialogAddService.channelIndex = arrayId;
    this.dcshService.chatSlideIn();
    const selectedChannel = this.tags[arrayId];
    await this.onChannelClick(selectedChannel.id);
  }
}
