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
  channelMessageAmount: number; 
  members: any['guest@guest.de'];
  channelMessage: any[];
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
  channelMessage: any = [];
  channelMessageAmount: number = 0;

  constructor(private firestore: Firestore, private dataService: DataService) {
    const coll = collection(firestore, 'tags');
    this.newTags$ = collectionData(coll, { idField: 'id' });
    this.newTags$.subscribe((tag: any) => {
      this.tagsData = tag;
    });
  }

  tags: Tag[] = []; // neue Tags werden als JSON hinzugefügt

  /**
   * Adds a new tag to Firestore based on the provided details.
   * Updates local properties and adds the tag to the Firestore collection and local array.
   *
   * @function addTag
   * @memberof MessageService
   * @param {string} generatedTag - The generated tag to be added.
   * @param {string} description - The description for the new tag.
   * @param {string} channelCreator - The creator of the channel associated with the tag.
   * @returns {Promise<void>} - A promise that resolves once the tag is added to Firestore.
   */
  async addTag(
    generatedTag: string,
    description: string,
    channelCreator: string
  ) {
    this.members.push(this.dataService.loggedInUserEmail);
    this.variablesForChannel(description, generatedTag, channelCreator);
    if (this.newTag) {
      const newChannel: Tag = this.newChannelTag();
      const docRef = await addDoc(collection(this.firestore, 'tags'), newChannel);
      newChannel.id = docRef.id;
      const tagWithId = { ...newChannel, id: docRef.id };
      this.tags.push(tagWithId);
    }
  }

  /**
   * Creates and returns a new channel tag object with defined properties.
   *
   * @function newChannelTag
   * @memberof MessageService
   * @returns {Object} - A new channel tag object with specified properties.
   */
  newChannelTag(): any {
    return {
      id: '',
      name: this.newTag,
      imagePath: 'assets/img/sidenav/tag.png',
      description: this.description,
      channelCreator: this.channelCreator,
      members: this.members,
      channelMessage: this.channelMessage,
      channelMessageAmount: this.channelMessageAmount,
    };
  }

  /**
   * Sets properties related to a channel using provided values.
   * @function variablesForChannel
   * @memberof MessageService
   * @param {string} description - The description for the channel.
   * @param {string} generatedTag - The generated tag for the channel.
   * @param {string} channelCreator - The creator of the channel.
   * @returns {void}
   */
  variablesForChannel(description, generatedTag, channelCreator) {
    this.description = description;
    this.newTag = generatedTag;
    this.channelCreator = channelCreator;
  }

  /**
   * Deletes a tag from Firebase Firestore based on the provided tagId.
   * Removes the tag object from the local array upon successful deletion.
   *
   * @function deleteFromFirebase
   * @memberof MessageService
   * @param {string} tagId - The ID of the tag to be deleted.
   * @returns {Promise<void>} - A promise that resolves once the tag is deleted.
   */
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
    const document = doc(this.firestore, 'tags', channelId);    
    const newData = {
      members: membersCache,
    };
    // Update the Firestore document with the new data.
    updateDoc(document, newData);
  }
}
