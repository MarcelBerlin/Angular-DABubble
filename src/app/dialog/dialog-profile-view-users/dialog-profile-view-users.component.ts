import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-dialog-profile-view-users',
  templateUrl: './dialog-profile-view-users.component.html',
  styleUrls: ['./dialog-profile-view-users.component.scss'],
})
export class DialogProfileViewUsersComponent {
  online: boolean = false;

  constructor(
    private dialogRef: DialogRef,
    public dataService:DataService,
    public varService: VariablesService,
    private dcshService: DashboardComponentsShowHideService
  ) {        
  }


  close() {
    this.dialogRef.close(); 
  }

  message() {
    this.varService.setVar('messagePNBox', true)
    this.dialogRef.close();
    this.varService.setVar('selectedUserToMessage',this.varService.selectedUserDetailView)
    this.dcshService.chatSlideOut()
  }
}
