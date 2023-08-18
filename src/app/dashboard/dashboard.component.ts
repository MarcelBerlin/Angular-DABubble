import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from './dashboard-components-show-hide.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { ChannelSelectionComponent } from './main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/channel-selection.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  imageUrl: string = 'assets/img/nav-hide.png';

  constructor(public dcshService: DashboardComponentsShowHideService, private directChatService: DirectChatService) {
    setTimeout(() =>{
      this.directChatService.checkForNewMessages();
    }, 5000);
  }

  /**
   * Toggles the visibility of the navigation by invoking the 'hideShowNavigation' method of 'dcshService'.
   *
   * This method is responsible for triggering the 'hideShowNavigation' method to toggle
   * the visibility of the navigation in the application.
   */
  hideShowNavigation() {
    this.dcshService.hideShowNavigation();
  }

  /**
   * Changes the image on hover based on the 'isHover' parameter.
   *
   * If the navigation is hidden (dcshService.hideNavigation is true),
   * it calls the 'showNavImg' method with the 'isHover' parameter.
   * Otherwise, it calls the 'hideNavImg' method with the 'isHover' parameter.
   *
   * @param {boolean} isHover - A boolean indicating whether the element is being hovered or not.
   */
  changeImageOnHover(isHover: boolean) {
    this.dcshService.hideNavigation
      ? this.showNavImg(isHover)
      : this.hideNavImg(isHover);
  }

  /**
   * Sets the image URL based on the 'isHover' parameter to display the navigation show image.
   *
   * If 'isHover' is true, it sets the 'imageUrl' to 'assets/img/nav-show-hover.png'.
   * If 'isHover' is false, it sets the 'imageUrl' to 'assets/img/nav-show.png'.
   *
   * @param {boolean} isHover - A boolean indicating whether the element is being hovered or not.
   */
  showNavImg(isHover: boolean) {
    isHover
      ? (this.imageUrl = 'assets/img/nav-show-hover.png')
      : (this.imageUrl = 'assets/img/nav-show.png');
  }

  /**
   * Sets the image URL based on the 'isHover' parameter to display the navigation show image.
   *
   * If 'isHover' is true, it sets the 'imageUrl' to 'assets/img/nav-hide-hover.png'.
   * If 'isHover' is false, it sets the 'imageUrl' to 'assets/img/nav-hide.png'.
   *
   * @param {boolean} isHover - A boolean indicating whether the element is being hovered or not.
   */
  hideNavImg(isHover: boolean) {
    isHover
      ? (this.imageUrl = 'assets/img/nav-hide-hover.png')
      : (this.imageUrl = 'assets/img/nav-hide.png');
  }
}
