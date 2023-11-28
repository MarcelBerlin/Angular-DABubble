import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { HeaderEditDialogComponent } from '../header-edit-dialog/header-edit-dialog.component';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { UploadService } from 'src/app/file-upload/services/upload.service';
import { FileUploadService } from 'src/app/file-upload/services/file-upload.service';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss'],
})
export class HeaderDialogComponent {
  loggedUserStatus: boolean = true;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public getUserData: DataService
  ) {
  }

  editingProfile() {
    const dialogRef = this.dialog.open(HeaderEditDialogComponent);
    dialogRef.afterClosed();
  }
}
