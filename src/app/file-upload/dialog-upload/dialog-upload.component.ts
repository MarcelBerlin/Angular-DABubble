import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../services/upload.service';
import { FileUploadService } from '../services/file-upload.service';
import { User } from 'src/app/models/user.class';
import {
  Firestore, collectionData, collection, setDoc, doc, updateDoc,
  deleteDoc, getDoc
} from '@angular/fire/firestore';
@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.scss']
})
export class DialogUploadComponent {
  // user: User = new User();
  loading: boolean = false;
  userId: string = '';


  constructor(
    public dialogRef: MatDialogRef<DialogUploadComponent>,
    public uploadService: UploadService,
    public fileService: FileUploadService,
    public firestore: Firestore,
  ) {

  }

  selectedFile: string = '';

  async log() {
    await this.showUrl();
    // await this.saveUser();
    this.dialogRef.close();
  }

  // async saveUser() {
  //   this.loading = true;
  //   const qData = doc(this.firestore, 'users', this.userId);
  //   const newData = this.user.toJSON();
  //   updateDoc(qData, newData).then(() => {
  //     console.log('Update done');
  //     this.loading = false;
  //     this.dialogRef.close();
  //   }).catch((error) => {
  //     console.log(error, 'update failed');
  //     this.loading = false;
  //   })
  // }

  async showUrl() {
    let urlA: any = document.getElementById('url')?.innerHTML;
    if (urlA?.length < 5) {
      setTimeout(this.showUrl, 1000);
    } else {
      // this.user.profilImageUrl = this.fileService.filePath;
    }
  }

}
