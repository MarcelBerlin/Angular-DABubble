import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogProfileViewUsersComponent } from '../dialog-profile-view-users/dialog-profile-view-users.component';

@Component({
  selector: 'app-dialog-members',
  templateUrl: './dialog-members.component.html',
  styleUrls: ['./dialog-members.component.scss'],
})
export class DialogMembersComponent {
  online: boolean = false;
  imgUrl: string = 'assets/img/person_add.png';

  constructor(
    public usersService: UsersService,
    public dataService: DataService,
    private dialog: MatDialog,
    private dialogRef: DialogRef
  ) {
    console.warn('log von Basti aus: "dialog-members"', dataService);
  }

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

  openMember() {
    this.dialogRef.close();
    this.dialog.open(DialogProfileViewUsersComponent);
  }

  changeUserAddHover(isHovered: boolean) {
    this.imgUrl = isHovered
      ? 'assets/img/person_add_hover.png'
      : 'assets/img/person_add.png';
  }
}
