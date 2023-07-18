import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogProfileViewUsersComponent } from '../dialog-profile-view-users/dialog-profile-view-users.component';
import { DialogAddMembersComponent } from '../dialog-add-members/dialog-add-members.component';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-dialog-members',
  templateUrl: './dialog-members.component.html',
  styleUrls: ['./dialog-members.component.scss'],
})
export class DialogMembersComponent {
  online: boolean = false;
  imgUrl: string = 'assets/img/person_add.png';

  constructor(
    public dataService: DataService,
    private dialog: MatDialog,
    private dialogRef: DialogRef,
    private varService:VariablesService
  ) {
    console.warn('log von Basti aus: "dialog-members"', dataService);
  }


  close() {
    this.dialogRef.close();
  }

  openMember(i:number) {
    this.dialogRef.close();    
    this.varService.setVar('selectedUserDetailView',i)
    this.dialog.open(DialogProfileViewUsersComponent);
  }

  changeUserAddHover(isHovered: boolean) {
    this.imgUrl = isHovered
      ? 'assets/img/person_add_hover.png'
      : 'assets/img/person_add.png';
  }

  addMembers() {
    this.dialogRef.close();
    this.dialog.open(DialogAddMembersComponent);
  }
}
