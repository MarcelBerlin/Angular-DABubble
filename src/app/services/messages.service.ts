import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  addDoc,
} from '@angular/fire/firestore';
import { Messages } from '../models/messages.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$: any = [];
  messageData: any = [];
  newMessage: Messages = new Messages();

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'messages');
    this.messages$ = collectionData(coll, { idField: 'channelId' });
    this.messages$.subscribe((message: any) => {
      this.messageData = message;
      console.log(this.newMessage);
    });
  }

  // Methode zum Hinzufügen einer Nachricht in Firebase
  addMessage(newMessage) {
    const messagesCollection = collection(this.firestore, 'messages');
    addDoc(messagesCollection, newMessage.toJSON());
  }

  // // Methode zum Abrufen der Nachrichten für einen bestimmten Kanal aus Firebase
  // getMessagesForChannel(channelId: string): Observable<Messages[]> {
  //   const getMessagesCollection = collection(this.firestore, 'messages' + channelId);
  //   (getMessagesCollection);
  // }
}
