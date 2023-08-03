import { Dialog } from '@angular/cdk/dialog';
import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { TestBastiService } from 'src/app/services/test-basti.service';
import { DashboardComponentsShowHideService } from '../dashboard-components-show-hide.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent {


  constructor(public varService: VariablesService) {
  }

  @ViewChild('scrollMe') scrollMe: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  
  scrollToBottom(): void {
    try {
        this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch (err) {
      console.log('autoscroll error');
    }
  }

}
