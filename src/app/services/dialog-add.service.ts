import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import 'firebase/compat/firestore';



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
  newTags$: any;
  tagsData: any[];



  constructor(
    private firestore: Firestore,
  ) {
    const coll = collection(firestore, 'tags');
    this.newTags$ = collectionData(coll, { idField: 'id' });
    this.newTags$.subscribe((tags: any) => {
      this.tagsData = tags;

    });
  }

  tags: Tag[] = []; // neue Tags werden als JSON hinzugefügt

  newTag: string = '';
  description: string = '';


  // async addTag(generatedTag: string) {
  //   this.newTag = generatedTag;
  //   if (this.newTag) {
  //     const tag: Tag = { id: '', name: this.newTag, imagePath: 'assets/img/sidenav/tag.png', description: this.description };

  //     // Firestore-Dokument erstellen und Tag speichern
  //     const docRef = await this.firestore.collection('tags').add(tag);

  //     // Tag mit generierter ID aus Firestore abrufen und dem lokalen Array hinzufügen
  //     const tagWithId = { ...tag, id: docRef.id };
  //     this.tags.push(tagWithId);

  //     setTimeout(() => {
  //       console.log(this.tags);
  //     }, 1000);
  //   }
  // }


  // async deleteTagFromFirestore(tag: Tag) {
  //   const tagRef = this.firestore.collection('tags').doc(tag.id);
  //   await tagRef.delete();

  //   // Tag aus dem lokalen Array entfernen
  //   this.tags = this.tags.filter(t => t.id !== tag.id);
  // }


}
