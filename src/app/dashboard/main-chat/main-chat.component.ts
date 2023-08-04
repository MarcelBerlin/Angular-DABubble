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

  isAutoScrolling = true;
  
  
  // onScroll() {
  //   this.deactivateAutoScroll();
  //   const element = this.scrollMe.nativeElement;
  //   // Überprüfen, ob der Benutzer manuell nach unten gescrollt hat
  //   this.isAutoScrolling = element.scrollTop + element.clientHeight === element.scrollHeight;
  // }
  
  // scrollToBottom(): void {
  //   try {
  //     const element = this.scrollMe.nativeElement;
  //     // Wenn das Element bereits am unteren Ende war, automatisch zum unteren Ende scrollen
  //     if (this.isAutoScrolling) {
  //       element.scrollTop = element.scrollHeight;
        
  //     }
  //   } catch (err) {
  //     console.log('autoscroll error');
  //   }
  // }
  
  // // Funktion zum Deaktivieren des automatischen Scrollens
  // deactivateAutoScroll() {
  //   this.isAutoScrolling = false;
  // }

  
  scrollToBottom(): void {
    try {
        this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch (err) {
      console.log('autoscroll error');
    }
  }

}
