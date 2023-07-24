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

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'messages');
    this.messages$ = collectionData(coll, { idField: 'channelId' });
    this.messages$.subscribe((message: any) => {
      this.messageData = message;
    });
  }

  // Methode zum Hinzufügen einer Nachricht in Firebase
  async addMessage(message: Messages): Promise<void> {
    const messagesCollection = collection(this.firestore, 'messages');
    await addDoc(messagesCollection, message);
  }

  // // Methode zum Abrufen der Nachrichten für einen bestimmten Kanal aus Firebase
  // getMessagesForChannel(channelId: string): Observable<Messages[]> {
  //   const getMessagesCollection = collection(this.firestore, 'messages' + channelId);
  //   (getMessagesCollection);
  // }
}
