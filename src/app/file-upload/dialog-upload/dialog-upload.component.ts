import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../services/upload.service';
import { FileUploadService } from '../services/file-upload.service';
import { User } from 'src/app/models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.scss']
})
export class DialogUploadComponent {
  user: User = new User();
  loading: boolean = false;
  userId: string = '';


  constructor(
    public dialogRef: MatDialogRef<DialogUploadComponent>,
    public uploadService: UploadService,
    public fileService: FileUploadService,
    public firestore: Firestore,
    private dataService: DataService,
  ) {

  }

  selectedFile: string = '';

  async log() {
    await this.showUrl();
    // await this.saveUser();
    this.dataService.updateUser();
    this.dialogRef.close();
  }

  // async saveUser() {
  //   // this.loading = true;

  //   const qData = doc(this.firestore, 'users', this.dataService.loggedInUserData.id);
  //   console.log(this.user);
  //   const newData = this.user.toJSON();
  //   // const newData = { img: this.chatDataSet.id, };
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
      this.dataService.loggedInUserData.img = this.fileService.lastUpload;
      // this.setNewUserData();
    }
  }


  // setNewUserData():void {
  //   this.user.name = this.dataService.loggedInUserData.name;
  //   this.user.img = this.dataService.loggedInUserData.img;
  //   this.user.email = this.dataService.loggedInUserData.email;
  //   this.user.online = this.dataService.loggedInUserData.online;
  //   this.user.directChats = this.dataService.loggedInUserData.directChats;
  //   // if (this.dataService.loggedInUserData.channels){
  //   //   this.user.channels = this.dataService.loggedInUserData.channels;
  //   // }
  // }

}
