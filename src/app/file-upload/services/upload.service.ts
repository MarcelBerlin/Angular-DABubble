import { Injectable, Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { FileUpload } from '../models/file-upload.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoService } from 'src/app/services/dialog-info.service';
import { DialogInfoComponent } from '../../dialog/dialog-info/dialog-info.component';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileLink: string = '';


  constructor(
    private uploadService: FileUploadService,
    public dialog: MatDialog,
    public dialogInfoService: DialogInfoService,
    ) { }


  /**
   * Handles the selection of files for uploading.
   * 
   * @param {Event} event - The event object containing selected files.
   * @returns {void}
   */
  selectFile(event: any): void {
    this.selectedFiles = undefined;
    this.selectedFiles = event.target.files;
    this.upload();
  }


  /**
   * Initiates the file upload process for the selected file.
   * If a file is selected, it invokes the 'uploadFile()' function.
   * 
   * @returns {void}
   */
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.uploadFile(file);
      }
    }
  }


/**
 * Uploads the specified file using the 'uploadService'.
 * Updates the 'currentFileUpload' and 'percentage' properties during upload.
 * Handles progress updates and errors through subscriptions.
 * 
 * @param {File} file - The file to be uploaded.
 * @returns {void}
 */
  uploadFile(file: File): void {
    this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            this.openDialogUploadFailed();
          }
        );
  }


  /**
   * Opens a custom dialog box to display an upload failure message.
   * Sets the dialog info text to code 8, which corresponds to the specific message.
   */
  openDialogUploadFailed(): void {
    this.dialogInfoService.setDialogInfoText(8);
    this.dialog.open(DialogInfoComponent, {
      panelClass: 'custom-modalbox',
    });
  }
}

