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
    this.UserAndMessageDetails();
    this.addTimeStampToMessage();
    this.saveMessageWithIdToDoc();
    this.messageData.push(this.newMessage);
  }

  UserAndMessageDetails(){
    this.newMessage.channelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id; // die ChannelID wird auf die jeweilige neue Message Datei angewendet
    this.varService.selectedChannelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newMessage.userId = this.dataService.loggedInUserData.userId;
    this.newMessage.userName = this.dataService.loggedInUserData.name;
    this.newMessage.userImg = this.dataService.loggedInUserData.img;
    this.newMessage.content = this.messageText; 
  }

  addTimeStampToMessage() {
    const timeStampData: ChannelTimeStamp = this.directChatService.getActualTimeStampForChannels(); 
    this.newMessage.dateTimeNumber = timeStampData.dateTimeNumber;
    this.newMessage.dateString = timeStampData.dateString;
    this.newMessage.clockString = timeStampData.clockString;
  }

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

  updateIdToMessageCollection(): void {
    const qData = doc(this.firestore, 'newMessages', this.newMessage.messageId);
    const newData = { messageId: this.newMessage.messageId };
    try {
      updateDoc(qData, newData);
    } catch (error) {
      console.log('update doc failed!!');
    }    
  }

  async loadChannelMessages(channelId: string) {
    const coll = collection(this.firestore, 'messages');
    const q = query(coll, where('channelId', '==', channelId));
    const messages = await getDocs(q);
    this.messageData = messages.docs.map((doc) => doc.data());
  }


  // // Initialisiere ein leeres Nachrichten-Array für den Channel
//  const channelMessages: any[] = [];
//  await setDoc(doc(collection(this.firestore, 'channelMessages'), docRef.id), {
//    messages: channelMessages
//  });


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
