import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/file-upload/services/file-upload.service';
import { UploadService } from 'src/app/file-upload/services/upload.service';

@Component({
  selector: 'app-header-edit-dialog',
  templateUrl: './header-edit-dialog.component.html',
  styleUrls: ['./header-edit-dialog.component.scss'],
})
export class HeaderEditDialogComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new ErrorStateMatcher();

  loggedUserName: string = '';
  loggedUserImg: string = '';
  loggedUserMail: string = '';

  newInputName: string = '';
  // newInputMail: string = '';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public fileUploadService: FileUploadService,
    public uploadService: UploadService,
    public getUserData: DataService
  ) {}

  saveUserChanges() {
    this.getUserData.loggedInUserData.name = this.newInputName;
    // this.getUserData.loggedInUserData.email = this.newInputMail;
    this.getUserData.updateUser();
  }

  /**
   * Opens the file explorer dialog for uploading a profile image.
   * Sets the profile image upload flag and base path for storage.
   *
   * @returns {void}
   */
  openFileExplorer(): void {
    this.fileUploadService.profileImgUpload = true;
    this.fileUploadService.basePath =
      '/uploads/' + this.getUserData.loggedInUserData.userId + '/profile/';
    this.fileInput.nativeElement.click();
  }
}
