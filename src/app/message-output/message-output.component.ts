import { Component } from '@angular/core';
import { UserToMessageService } from '../user-to-message/user-to-message.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-message-output',
  templateUrl: './message-output.component.html',
  styleUrls: ['./message-output.component.scss']
})
export class MessageOutputComponent {

  constructor(public userToMessageService:UserToMessageService, public dataService:DataService){}

  showInfoOutput =(index: number) => (this.userToMessageService.showInfoBox = index);
  hideInfoOutput = () => (this.userToMessageService.showInfoBox = -1);
  calculateIndexOutput = (): number => (this.userToMessageService.saveArray[this.userToMessageService.showInfoBox].userId);

}
