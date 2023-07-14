import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestBastiService } from 'src/app/services/test-basti.service';

@Component({
  selector: 'app-dialog-channel-edition',
  templateUrl: './dialog-channel-edition.component.html',
  styleUrls: ['./dialog-channel-edition.component.scss'],
})
export class DialogChannelEditionComponent {
  name: boolean = false;
  description: boolean = false;


  constructor(public dialog: MatDialog, private dialogRef: DialogRef,public tBS: TestBastiService) {}

  closeDialog() {
    this.dialogRef.close();
  }

  editOn(item: string) {    
    this[item] = !this[item];
  }
  

}
