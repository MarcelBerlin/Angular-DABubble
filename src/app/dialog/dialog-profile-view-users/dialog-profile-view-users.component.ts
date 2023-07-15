import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-profile-view-users',
  templateUrl: './dialog-profile-view-users.component.html',
  styleUrls: ['./dialog-profile-view-users.component.scss'],
})
export class DialogProfileViewUsersComponent {
  online: boolean = false;

  constructor(private dialogRef: DialogRef) {}

  ngOnInit() {
    this.testTime();
  }

  testTime() {
    setInterval(() => {
      this.online = !this.online;
    }, 1000);
  }

  close() {
    this.dialogRef.close();
  }
}
