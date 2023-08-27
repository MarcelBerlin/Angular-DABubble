import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  getDoc,
} from '@angular/fire/firestore';
import 'firebase/compat/firestore';
import { DataService } from './data.service';

interface Tag {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  channelCreator: string;
  // members: any[];
  members: any['guest@guest.de'];
}

@Injectable({
  providedIn: 'root',
})
export class DialogAddService {
  newTags$: any;
  tagsData: any = [];
  channelIndex: number = 0;
  newTag: string = '';
  description: string = '';
  channelCreator: string = '';
  members: any = [];

  constructor(private firestore: Firestore, private dataService: DataService) {
    const coll = collection(firestore, 'tags');
    this.newTags$ = collectionData(coll, { idField: 'id' });
    this.newTags$.subscribe((tag: any) => {
      this.tagsData = tag;
      // console.log(this.tagsData);
    });
  }

  tags: Tag[] = []; // neue Tags werden als JSON hinzugefügt

  async addTag(
    generatedTag: string,
    description: string,
    channelCreator: string
  ) {
    this.members.push(this.dataService.loggedInUserEmail);
    this.description = description;
    this.newTag = generatedTag;
    this.channelCreator = channelCreator;

    if (this.newTag) {
      const newChannel: Tag = {
        id: '',
        name: this.newTag,
        imagePath: 'assets/img/sidenav/tag.png',
        description: this.description,
        channelCreator: this.channelCreator,
        members: this.members,
      };

      // Firestore-Dokument erstellen und Tag speichern
      const docRef = await addDoc(
        collection(this.firestore, 'tags'),
        newChannel
      );
      newChannel.id = docRef.id;

      // // Initialisiere ein leeres Nachrichten-Array für den Channel
      // const channelMessages: any[] = [];
      // await setDoc(doc(collection(this.firestore, 'channelMessages'), docRef.id), {
      //   messages: channelMessages
      // });

      // Tag mit generierter ID aus Firestore abrufen und dem lokalen Array hinzufügen
      const tagWithId = { ...newChannel, id: docRef.id };
      this.tags.push(tagWithId);
      
    }
  }

  async deleteFromFirebase(tagId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'tags', tagId));
      // Das Tag-Objekt aus dem lokalen Array entfernen
      this.tags = this.tags.filter((tag) => tag.id !== tagId);

      console.log('Tag erfolgreich gelöscht.');
    } catch (error) {
      console.error('Fehler beim Löschen des Tags:', error);
    }
  }

  /**
   * Add members to a channel in the Firestore database.
   *
   * @param {string} channelId - The ID of the channel to which members will be added.
   * @param {Array} membersCache - An array containing the members to be added.
   */
  addUserToChannel(channelId, membersCache) {
    // Get the Firestore document reference for the specified channel.
    const document = doc(this.firestore, 'tags', channelId);

    // Prepare the data to update in the document.
    const newData = {
      members: membersCache,
    };

    // Update the Firestore document with the new data.
    updateDoc(document, newData);
  }
}
