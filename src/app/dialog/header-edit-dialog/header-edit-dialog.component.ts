import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/file-upload/services/file-upload.service';
import { UploadService } from 'src/app/file-upload/services/upload.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-header-edit-dialog',
  templateUrl: './header-edit-dialog.component.html',
  styleUrls: ['./header-edit-dialog.component.scss'],
})
export class HeaderEditDialogComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  matcher = new ErrorStateMatcher();

  loggedUserName: string = '';
  loggedUserImg: string = '';
  loggedUserMail: string = '';

  newInputName: string = '';
  newInputMail: string = '';
  buttonDis: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  editForm: FormGroup = new FormGroup({
    email: new FormControl(this.getUserData.loggedInUserData.email, [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}.?[a-zA-Z]{0,2}'
      ),
    ]),
    name: new FormControl(this.getUserData.loggedInUserData.name, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    public dialog: MatDialog,
    // private auth: AuthService,
    public fileUploadService: FileUploadService,
    public uploadService: UploadService,
    public getUserData: DataService,
    private dialogRef: DialogRef
  ) {
  }



  saveUserChanges() {
    if (this.editForm.valid) {
      this.getUserData.loggedInUserData.name = this.editForm.value.name;
      this.getUserData.loggedInUserData.email = this.editForm.value.email;
      this.getUserData.updateUser();
      this.dialogRef.close();
    }
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
