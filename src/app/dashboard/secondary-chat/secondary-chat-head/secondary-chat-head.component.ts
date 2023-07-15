import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';

@Component({
  selector: 'app-secondary-chat-head',
  templateUrl: './secondary-chat-head.component.html',
  styleUrls: ['./secondary-chat-head.component.scss']
})
export class SecondaryChatHeadComponent {


  constructor(private dcshService: DashboardComponentsShowHideService){}


  slideOut() {
    this.dcshService.chatSlideOut()
  }
}
