import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  addDoc,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { Messages } from '../models/messages.interface';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DialogAddService } from './dialog-add.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { VariablesService } from './variables.service';

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

  constructor(
    private firestore: Firestore,
    private dataService: DataService,
    private dialogAddService: DialogAddService,
    private direktChatService: DirectChatService,
    public varService: VariablesService
  ) { }

  // Methode zum Hinzufügen einer Nachricht in Firebase
  async addMessage() {
    this.newMessage.channelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id; // die ChannelID wird auf die jeweilige neue Message Datei angewendet
    this.varService.selectedChannelId = this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newMessage.userId = this.dataService.loggedInUserData.userId;
    this.newMessage.userName = this.dataService.loggedInUserData.name;
    this.newMessage.userImg = this.dataService.loggedInUserData.img;
    this.newMessage.content = this.messageText;
    this.newMessage.timestamp = this.direktChatService.getActualTimeStamp();   

    const coll = collection(this.firestore, 'messages'); // definiert die Collection, worauf man zugreifen möchte
    await addDoc(coll, this.newMessage.toJSON()); // fügt eine neue Nachricht aus dem Textfeld in die Firebase Collection hinzu bzw. returned die Message in docId
    this.messageData.push(this.newMessage);
    
  }

  // setSelectedChannel(channelId: string) {
  //   // Suche nach dem Index des Kanals basierend auf der übergebenen channelId
  //   this.dialogAddService.channelIndex = this.dialogAddService.tags.findIndex(tag => tag.id === channelId);
  // }

}
