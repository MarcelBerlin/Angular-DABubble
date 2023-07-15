import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardComponentsShowHideService {
  secondaryChatSlideOut: boolean = false;
  hideNavigation: boolean = false;

  constructor() { }

  chatSlideOut() {
    this.secondaryChatSlideOut = true;
  }

  chatSlideIn() {
    this.secondaryChatSlideOut = false;
  }

  hideShowNavigation() {
    this.hideNavigation = !this.hideNavigation;   
  }

}
