import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from '../dashboard/dashboard-components-show-hide.service';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { Dialog } from '@angular/cdk/dialog';
import { ChatService } from '../services/chat.service';
import { DataService } from '../services/data.service';
import { DialogAddService } from '../services/dialog-add.service';
import { MessageService } from '../services/messages.service';
import { VariablesService } from '../services/variables.service';
import { DirectChatService } from './services/direct-chat.service';
import { TimelinesService } from './services/timelines.service';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.scss']
})
export class DirectChatComponent {
  hoveredMessagesMainChat: boolean = false;
  emptyChat: boolean = false;
  chatText: string = '';
  

  constructor(
    private dcshService: DashboardComponentsShowHideService,
    private dialog: Dialog,
    public varService: VariablesService,
    public dialogAdd: DialogAddService,
    public messageService: MessageService,
    public chatService: ChatService,
    public dataService: DataService,
    public directChatService: DirectChatService,
    public timelinesService: TimelinesService,
    ) {
      this.getChanges();
    }


  /**
  * Opens the DialogProfileViewUsersComponent to display the profile view of users.
  * 
  * @returns {void}
  */
  profileViewUsers(): void {
    this.dialog.open(DialogProfileViewUsersComponent);
  }


  /**
   * Subscribes to changes in the users$ observable of dataService. If directChatActive is true 
   * and a directChatIndex.directChatId is available, it reloads the chat data sets in directChatService.
   * 
   * @returns {void}
   */
  getChanges():void {
    this.dataService.users$.subscribe(() => {
      if (this.directChatService.directChatActive && this.directChatService.directChatIndex.directChatId) {
        this.directChatService.loadChatDataSets(this.directChatService.directChatIndex.directChatId);
      }
      this.directChatService.checkForNewMessages();
    })
  }


  loadChatPartnerProfilImg():string {
    this.dataService.userData[0].img;
    const firstMemberId: string = this.directChatService.directChat.firstMember;
    const secondMemberId: string = this.directChatService.directChat.secondMember;
    let searchUserId: string = '';
    let profileImgUrl: string = '';
    if(firstMemberId == this.dataService.loggedInUserData.userId) searchUserId = secondMemberId;
    else searchUserId = firstMemberId;
    for (let i = 0; i < this.dataService.userData.length; i++) {
      if (this.dataService.userData[i].userId == searchUserId){
        profileImgUrl = this.dataService.userData[i];
      }
    }
    return profileImgUrl;
  }
}
