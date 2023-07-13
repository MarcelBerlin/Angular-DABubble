import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogInfoService } from '../services/dialog-info.service';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    public dialogInfoService: DialogInfoService,
  ) { }


  /**
   * Close the dialog information.
   * 
   * @returns {void}
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
