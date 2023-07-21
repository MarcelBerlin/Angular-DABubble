import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, addDoc } from '@angular/fire/firestore';
import { Messages } from '../models/messages.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private firestore: Firestore) { }

  // Methode zum Hinzufügen einer Nachricht in Firebase
  async addMessage(message: Messages): Promise<void> {
    const messagesCollection = collection(this.firestore, 'messages');
    await addDoc(messagesCollection, message);
  }

  // Methode zum Abrufen der Nachrichten für einen bestimmten Kanal aus Firebase
  getMessagesForChannel(channelId: string): Observable<Messages[]> {
    const messagesCollection: CollectionReference<Messages> = collection(this.firestore, 'messages', ref => ref.where('channelId', '==', channelId).orderBy('timestamp', 'desc'));
    return collectionData(messagesCollection);
  }
}

