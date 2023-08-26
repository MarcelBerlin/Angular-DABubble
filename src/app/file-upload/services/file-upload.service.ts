import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
import { DataService } from 'src/app/services/data.service';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  basePath ='/uploads/';
  filePath: string = '';
  filename: string = '';
  lastUpload: string = '';


  constructor(
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage,
    private dataService: DataService, 
    ) {}


  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    console.log('filename', this.basePath +'/'+ fileUpload.file.name);
    this.filePath = this.basePath +'/'+ fileUpload.file.name;
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.lastUpload = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
          console.log('upload finished: ', downloadURL);

          this.deleteFile(this.dataService.loggedInUserData.img);
          
          this.dataService.loggedInUserData.img = this.lastUpload;
          // this.dataService.loggedInUserData.img = fileUpload;
          
          this.dataService.updateUser();
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }




  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  deleteFile(fileURL: string): Promise<void> {
    const fileRef = this.storage.refFromURL(fileURL);

    // Delete the file
    return fileRef.delete().toPromise();
  }







  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile2(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  

  
}

