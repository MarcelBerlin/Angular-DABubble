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
import { DirectChatService } from '../direct-chat/direct-chat.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$: any = [];
  messageData: any = [];
  newMessage: Messages = new Messages();
  messageText: string = '';
  messageId: string = 'unset';

  constructor(private firestore: Firestore, private dataService: DataService, private dialogAddService: DialogAddService, private direktChatService: DirectChatService) {
    const coll = collection(firestore, 'messages');
    this.messages$ = collectionData(coll, { idField: 'id' });
    this.messages$.subscribe((message: any) => {
      this.messageData = message;
      // console.log(this.messageData);
    });
  }

  // Methode zum Hinzufügen einer Nachricht in Firebase
  async addMessage() {    
    this.newMessage.channelId = this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newMessage.userId = this.dataService.loggedInUserData.userId;
    this.newMessage.content = this.messageText;
    this.newMessage.timestamp = this.direktChatService.getActualTimeStamp();   
    console.log(this.dialogAddService.tagsData[this.dialogAddService.channelIndex]);
    
    const coll= collection (this.firestore, 'messages'); // definiert die Collection, worauf man zugreifen möchte
    await addDoc(coll, this.newMessage.toJSON()); // fügt eine neue Nachricht aus dem Textfeld in die Firebase Collection hinzu bzw. returned die Message in docId
    console.log(this.newMessage); 
    
    
         
  }

  
}
