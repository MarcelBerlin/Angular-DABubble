import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from 'src/environments/environment';


interface Tag {
  id: string;
  name: string;
  imagePath: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class DialogAddService {

  firestore: firebase.firestore.Firestore; // Variable greift auf die Instanz "firebase.firestore" und dann auf die Klasse ".Firestore" zu

  constructor() {
    firebase.initializeApp(environment.firebase);
    this.firestore = firebase.firestore();
  }

  tags: Tag[] = []; // neue Tags werden als JSON hinzugefügt
 
  newTag: string = '';
  description: string = '';


  async addTag(generatedTag: string) {
    this.newTag = generatedTag;
    if (this.newTag) {
      const tag: Tag = { id: '', name: this.newTag, imagePath: 'assets/img/sidenav/tag.png', description: this.description };
  
      // Firestore-Dokument erstellen und Tag speichern
      const docRef = await this.firestore.collection('tags').add(tag);
  
      // Tag mit generierter ID aus Firestore abrufen und dem lokalen Array hinzufügen
      const tagWithId = { ...tag, id: docRef.id };
      this.tags.push(tagWithId);
  
      setTimeout(() => {
        console.log(this.tags);
      }, 1000);
    }
  }
  

  async deleteTagFromFirestore(tag: Tag) {
    const tagRef = this.firestore.collection('tags').doc(tag.id);
    await tagRef.delete();
  
    // Tag aus dem lokalen Array entfernen
    this.tags = this.tags.filter(t => t.id !== tag.id);
  }
  

}
