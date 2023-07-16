import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-add-members',
  templateUrl: './dialog-add-members.component.html',
  styleUrls: ['./dialog-add-members.component.scss'],
})
export class DialogAddMembersComponent {
  constructor(private dialogRef: DialogRef) {}
  close() {
    this.dialogRef.close();
  }
}
