import { Component } from '@angular/core';
import { DashboardComponentsShowHideService } from './dashboard-components-show-hide.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  

  constructor(public dcshService: DashboardComponentsShowHideService) { }
  
  hideShowNavigation() {
    this.dcshService.hideShowNavigation();
  }
}
