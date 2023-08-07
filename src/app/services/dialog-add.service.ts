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

interface Tag {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  channelCreator: string;
  membersToChannelArray: { member: '' };
}

@Injectable({
  providedIn: 'root',
})
export class DialogAddService {
  newTags$: any;
  tagsData: any = [];
  channelIndex: number = 0;

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'tags');
    this.newTags$ = collectionData(coll, { idField: 'id' });
    this.newTags$.subscribe((tag: any) => {
      this.tagsData = tag;
      // console.log(this.tagsData);
    });
  }

  tags: Tag[] = []; // neue Tags werden als JSON hinzugefügt

  newTag: string = '';
  description: string = '';
  channelCreator: string = '';
  membersToChannelArray: any = {};

  async addTag(
    generatedTag: string,
    description: string,
    channelCreator: string
  ) {
    this.description = description;
    this.newTag = generatedTag;
    this.channelCreator = channelCreator;
    if (this.newTag) {
      const tag: Tag = {
        id: '',
        name: this.newTag,
        imagePath: 'assets/img/sidenav/tag.png',
        description: this.description,
        channelCreator: this.channelCreator,
        membersToChannelArray: this.membersToChannelArray,
      };

      // Firestore-Dokument erstellen und Tag speichern
      const docRef = await addDoc(collection(this.firestore, 'tags'), tag);

      // Tag mit generierter ID aus Firestore abrufen und dem lokalen Array hinzufügen
      const tagWithId = { ...tag, id: docRef.id };
      this.tags.push(tagWithId);

      // setTimeout(() => {
      //   console.log(this.tags);
      // }, 1000);
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

  addUserToChannel(channelId: string, addedUserToChannel: string) {
    // if (this.membersToChannelArray.indexOf(addedUserToChannel) === -1) {
    //   this.membersToChannelArray.push(addedUserToChannel);
    // }
    // console.log(this.membersToChannelArray);
    // console.log(channelId, addedUserToChannel);
    // this.membersToChannel.push(addedUserToChannel);
    // console.log(this.membersToChannel);
    // const document = doc(this.firestore, 'tags', channelId);
    // const newData = this.membersToChannel;
    // updateDoc(document, newData);
  }
}
