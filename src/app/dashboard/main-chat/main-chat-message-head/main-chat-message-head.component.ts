import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-main-chat-message-head',
  templateUrl: './main-chat-message-head.component.html',
  styleUrls: ['./main-chat-message-head.component.scss'],
})
export class MainChatMessageHeadComponent {
  online: boolean = false;
  
  constructor(public dataService: DataService, private dialog:MatDialog, public varService:VariablesService) { }
  
  ngOnInit() { 
    this.onlineAnimation()
  }

  onlineAnimation() { 
    setInterval(() => { this.online = !this.online }, 1000);
  }

  openMember() {
    // this.dialogRef.close();
    this.dialog.open(DialogProfileViewUsersComponent);
  }

}
