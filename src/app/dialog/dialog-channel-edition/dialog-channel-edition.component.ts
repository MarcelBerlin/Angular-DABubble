import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-channel-edition',
  templateUrl: './dialog-channel-edition.component.html',
  styleUrls: ['./dialog-channel-edition.component.scss']
})
export class DialogChannelEditionComponent {

constructor(public dialog: MatDialog, private dialogRef : DialogRef){}

  closeDialog() {
    this.dialogRef.close()

  }
}