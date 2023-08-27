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
} from '@angular/fire/firestore';
import { Messages } from '../models/messages.interface';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DialogAddService } from './dialog-add.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { VariablesService } from './variables.service';
import { DashboardComponentsShowHideService } from '../dashboard/dashboard-components-show-hide.service';
import { ChannelTimeStamp } from '../dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/models/channel-timestamp.class';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$: any = [];
  messageData: any = [];
  channelMessages: any = [];
  newMessage: Messages = new Messages();
  messageText: string = '';
  messageId: string = 'unset';
  selectedChannel: string = '';
  emojis: any = [];
  tags: any; // ADDED BY FELIX
  

  constructor(
    private firestore: Firestore,
    private dataService: DataService,
    private dialogAddService: DialogAddService,
    private directChatService: DirectChatService,
    public varService: VariablesService,
    private dcshService: DashboardComponentsShowHideService
  ) {   }

  // Methode zum Hinzufügen einer Nachricht in Firebase
  async addMessage() {
    this.newMessage.channelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id; // die ChannelID wird auf die jeweilige neue Message Datei angewendet
    this.varService.selectedChannelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newMessage.userId = this.dataService.loggedInUserData.userId;
    this.newMessage.userName = this.dataService.loggedInUserData.name;
    this.newMessage.userImg = this.dataService.loggedInUserData.img;
    this.newMessage.content = this.messageText; 

    const timeStampData: ChannelTimeStamp = this.directChatService.getActualTimeStampForChannels(); 
    this.newMessage.dateTimeNumber = timeStampData.dateTimeNumber;
    this.newMessage.dateString = timeStampData.dateString;
    this.newMessage.clockString = timeStampData.clockString;
    console.log(this.newMessage.dateTimeNumber);
    console.log(this.newMessage.dateString);
    console.log(this.newMessage.clockString);  

    const coll = collection(this.firestore, 'newMessages'); // definiert die Collection, worauf man zugreifen möchte
    await addDoc(coll, this.newMessage.toJSON()); // fügt eine neue Nachricht aus dem Textfeld in die Firebase Collection hinzu bzw. returned die Message in docId
    this.messageData.push(this.newMessage);
  }

  
  // ##################  BITTE STEHEN LASSEN !!! #################
  // ################# Marcel Test für channelMessages Array #############

  // async addMessage() {
  //   // Vorhandener Code zur Erstellung der Nachricht
  //   this.newMessage.userId = this.dataService.loggedInUserData.userId;
  //   this.newMessage.userName = this.dataService.loggedInUserData.name;
  //   this.newMessage.userImg = this.dataService.loggedInUserData.img;
  //   this.newMessage.content = this.messageText;
  
  //   const timeStampData: ChannelTimeStamp = this.directChatService.getActualTimeStampForChannels(); 
  //   this.newMessage.dateTimeNumber = timeStampData.dateTimeNumber;
  //   this.newMessage.dateString = timeStampData.dateString;
  //   this.newMessage.clockString = timeStampData.clockString;
  
  //   // Channel-spezifische Daten
  //   const selectedChannelIndex = this.dialogAddService.channelIndex;
  //   const selectedChannel = this.dialogAddService.tagsData[selectedChannelIndex];
  //   const channelId = selectedChannel.id;
  
  //   // Nachricht der Channel-Subkollektion hinzufügen
  //   const channelMessagesColl = collection(this.firestore, 'channelMessages', channelId);
  //   await addDoc(channelMessagesColl, this.newMessage.toJSON());
  
  //   // Aktualisierte Nachrichtenliste
  //   this.messageData.push(this.newMessage);
  // }
  
// ##########################################################

  async loadChannelMessages(channelId: string) {
    const coll = collection(this.firestore, 'messages');
    const q = query(coll, where('channelId', '==', channelId));
    const messages = await getDocs(q);
    this.messageData = messages.docs.map((doc) => doc.data());
  }

  async onChannelClick(channelId: string) {
    this.varService.selectedChannelId = channelId;
    await this.loadChannelMessages(channelId);
  }

  privateAnswer(index: number) {
    this.messageData = index;
  }
  

  // setSelectedChannel(channelId: string) {
  //   // Suche nach dem Index des Kanals basierend auf der übergebenen channelId
  //   this.dialogAddService.channelIndex = this.dialogAddService.tags.findIndex(tag => tag.id === channelId);
  // }





  // ######### AB HIER ############
  // ###### FELIX TESTZWECKE ###### 
  //   KOPIERT AUS MENU-SIDENAV.TS 
  // ###### DIRECT MESSAGES #######

  messageToUser(arrayId: number) {
    this.currentUser()
      ? this.sendMessageToLoggedUser(arrayId)
      : this.sendMessageToSpecificUser(arrayId);
    this.varService.previousScrollTop = 0; // important for the autoscroll functionality
    this.getDirectChatData(arrayId);
  }

  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
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

  getDirectChatData(arrayId: number): void {
    if (this.directChatService.directChatActive) {
      let clickedUserId: string = this.dataService.userData[arrayId].id;
      this.directChatService.getChatId(clickedUserId);
    }
  }

  // ######### AB HIER ############
  // ###### FELIX TESTZWECKE ###### 
  //   KOPIERT AUS MENU-SIDENAV.TS 
  // ######### CHANNELS  ##########

  async openChannel(arrayId: number) {
    this.varService.setVar('mainChatHead', 0);
    this.varService.setVar('selectedChannel', arrayId);
    this.dialogAddService.channelIndex = arrayId;
    this.dcshService.chatSlideIn();

    const selectedChannel = this.tags[arrayId];
    await this.onChannelClick(selectedChannel.id);
  } 
} 
