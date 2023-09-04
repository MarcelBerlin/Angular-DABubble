import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
import { DataService } from 'src/app/services/data.service';
import { UserToMessageService } from 'src/app/user-to-message/user-to-message.service';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  basePath = '/uploads/';
  filePath: string = '';
  filename: string = '';
  lastUpload: string = '';
  profileImgUpload: boolean = false;
  uploadPercentage: number = 0;


  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private dataService: DataService,
    private userToMessageService: UserToMessageService,
  ) { }


  /**
   * Uploads the provided file to storage using AngularFire Storage.
   * Updates the 'profileImgUpload' property to indicate an ongoing upload.
   * Creates the file's storage path and initiates the upload task.
   * Retrieves the download URL upon completion and calls 'finalizeUpload()'.
   * 
   * @param {FileUpload} fileUpload - The file upload information.
   * @returns {Observable<number | undefined>} - An observable of the upload progress percentage.
   */
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    this.filePath = this.basePath + '/' + fileUpload.file.name;
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.finalizeUpload(downloadURL, fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }


  /**
   * Finalizes the file upload process by updating the file upload data,
   * saving the file information, and triggering a user update.
   * 
   * @param {string} downloadURL - The download URL of the uploaded file.
   * @param {FileUpload} fileUpload - The file upload information.
   */
  finalizeUpload(downloadURL: string, fileUpload:FileUpload): void {
    fileUpload.url = downloadURL;
    this.lastUpload = downloadURL;
    fileUpload.name = fileUpload.file.name;
    this.filename = fileUpload.name;
    this.saveFileData(fileUpload);
    if (this.profileImgUpload) this.userUpdate();
    else this.userToMessageService.insertFileLink(this.filename, this.lastUpload);
  }


  /**
   * Updates the user's profile image, handling cases of existing and new images.
   * 
   * @returns {void}
   */
  userUpdate():void {
    if (this.profileImgUpload && this.dataService.loggedInUserData.img != '/assets/img/members/avatar2.png') {
      this.deleteFile(this.dataService.loggedInUserData.img);
      this.profileImgUpload = false;
      this.dataService.loggedInUserData.img = this.lastUpload;
      this.dataService.updateUser();
    } else if (this.profileImgUpload) {
      this.dataService.loggedInUserData.img = this.lastUpload;
      this.dataService.updateUser();
      this.profileImgUpload = false;
    } else {
      this.profileImgUpload = false;
    }
  }


  /**
   * Saves the file information to the Firebase database.
   * 
   * @param {FileUpload} fileUpload - The file upload information.
   * @returns {void}
   */
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }


  /**
   * Deletes a file from Firebase Storage based on its URL.
   * @param {string} fileURL - The URL of the file to be deleted.
   * @returns {Promise<void>} - A promise indicating the success of the deletion.
   */
  deleteFile(fileURL: string): Promise<void> {
    const fileRef = this.storage.refFromURL(fileURL);
    return fileRef.delete().toPromise();
  }






  // unused functions ##############################################################
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

