import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-profile-view-users',
  templateUrl: './dialog-profile-view-users.component.html',
  styleUrls: ['./dialog-profile-view-users.component.scss']
})
export class DialogProfileViewUsersComponent {

  constructor(private dialogRef: DialogRef) { }
  
  close() {
    this.dialogRef.close();
  }

}
