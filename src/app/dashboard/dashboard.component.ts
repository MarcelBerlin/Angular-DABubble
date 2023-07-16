import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from './dashboard-components-show-hide.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  imageUrl: string = 'assets/img/nav-hide.png';

  constructor(public dcshService: DashboardComponentsShowHideService) {}

  hideShowNavigation() {
    this.dcshService.hideShowNavigation();
  }

  changeImageOnHover(isHover: boolean) {
    this.dcshService.hideNavigation
      ? this.showNavImg(isHover)
      : this.hideNavImg(isHover);
  }

  showNavImg(isHover: boolean) {
    isHover
      ? (this.imageUrl = 'assets/img/nav-show-hover.png')
      : (this.imageUrl = 'assets/img/nav-show.png');
  }

  hideNavImg(isHover: boolean) {
    isHover
      ? (this.imageUrl = 'assets/img/nav-hide-hover.png')
      : (this.imageUrl = 'assets/img/nav-hide.png');
  }
}
