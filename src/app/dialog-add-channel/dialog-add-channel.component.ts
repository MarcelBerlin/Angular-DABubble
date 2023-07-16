import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DialogAddService } from '../services/dialog-add.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

interface Tag {
  name: string;
  imagePath: string;
}

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent {

  newTag: string = '';
  description: string = '';

  constructor(private dialogRef : DialogRef, public getService: DialogAddService) {

  }

  closeDialog() {
    // Firestore-Dokumente abrufen und auf die Tags zugreifen
    const firestore = firebase.firestore();
    firestore.collection('tags').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tag = doc.data() as Tag;
        console.log(tag);        
      });
    });
  
    this.dialogRef.close();
  }
  

  generateTag() {
    this.getService.addTag(this.newTag);
    this.newTag = ''; // Zurücksetzen des Inputfelds nach dem Hinzufügen
    setTimeout(() => {
      this.closeDialog();
    }, 1000);
    
  }

}
