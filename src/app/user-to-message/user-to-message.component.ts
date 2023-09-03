import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { VariablesService } from '../services/variables.service';
import { UserToMessageService } from './user-to-message.service';

@Component({
  selector: 'app-user-to-message',
  templateUrl: './user-to-message.component.html',
  styleUrls: ['./user-to-message.component.scss'],
})

export class UserToMessageComponent {
  selectedUserIndex!: number;
  invisibleSign: string = '\u200B'; // verstecktes Zeichen


  constructor(
    public dataService: DataService,
    public varService: VariablesService,
    public userToMessageService: UserToMessageService,
  ) { }

  showInfoInput = (index: number) => (this.userToMessageService.showInfoBox = index);


  hideInfoInput = () => (this.userToMessageService.showInfoBox = -1);


  calculateIndexInput = (): number => (this.userToMessageService.memberCache[this.userToMessageService.showInfoBox].id);

  
  selectedUser(index: number) {
    this.userToMessageService.memberCache.push({
      number: this.userToMessageService.memberCache.length,
      member: this.dataService.userData[index].name,
      id: index,
      email: this.dataService.userData[index].email,
      userId: this.dataService.userData[index].userId,
    });
    this.varService.setVar('sign', false);
  }
}
