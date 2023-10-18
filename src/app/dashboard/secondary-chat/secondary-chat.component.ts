import { Component } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from '../dashboard-components-show-hide.service';

@Component({
  selector: 'app-secondary-chat',
  templateUrl: './secondary-chat.component.html',
  styleUrls: ['./secondary-chat.component.scss']
})
export class SecondaryChatComponent {
 constructor(public varService: VariablesService, public dcshService: DashboardComponentsShowHideService){}

}
