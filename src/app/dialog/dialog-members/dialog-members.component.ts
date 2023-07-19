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
    private varService: VariablesService
  ) {
    console.warn('log von Basti aus: "dialog-members"', dataService);
  }

  /**
   * Closes the current dialog.
   *
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Opens the 'DialogProfileViewUsersComponent' dialog to display the profile of a selected member.
   *
   * This method closes the current dialog ('dialogRef') before opening the new one.
   * It sets the 'selectedUserDetailView' variable in 'varService' to the index 'i' representing the selected member.
   * Then, it opens the 'DialogProfileViewUsersComponent' dialog to display the profile details of the selected member.
   *
   * @param {number} i - The index representing the selected member in the data source.
   */
  openMember(i: number) {
    this.dialogRef.close();
    this.varService.setVar('selectedUserDetailView', i);
    this.dialog.open(DialogProfileViewUsersComponent);
  }

  /**
   * Changes the image URL based on the 'isHovered' parameter to display the user add image with hover effect.
   *
   * This method sets the 'imgUrl' property to either 'assets/img/person_add_hover.png'
   * if 'isHovered' is true, or 'assets/img/person_add.png' if 'isHovered' is false.
   *
   * @param {boolean} isHovered - A boolean indicating whether the element is being hovered or not.
   */
  changeUserAddHover(isHovered: boolean) {
    this.imgUrl = isHovered
      ? 'assets/img/person_add_hover.png'
      : 'assets/img/person_add.png';
  }

  /**
   * Closes the current dialog and opens the 'DialogAddMembersComponent' dialog to add members.
   *
   * This method closes the current dialog ('dialogRef') before opening the 'DialogAddMembersComponent'.
   * It is responsible for triggering the 'DialogAddMembersComponent' dialog to add members to a group or channel.
   * The 'DialogAddMembersComponent' is used to provide a user interface for adding members.
   */
  addMembers() {
    this.dialogRef.close();
    this.dialog.open(DialogAddMembersComponent);
  }
}
