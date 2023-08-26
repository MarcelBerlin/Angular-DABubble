import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { VariablesService } from '../services/variables.service';

@Component({
  selector: 'app-user-to-message',
  templateUrl: './user-to-message.component.html',
  styleUrls: ['./user-to-message.component.scss']
})
export class UserToMessageComponent {
  @ViewChild('editableDiv') editableDiv!: ElementRef;


  memberCache = [{ number: 0, member: '', id: 0 }];
  selectedUserIndex!: number;
  invisibleSign: string = '\u200B';
  showInfoBox: number = -1;
  saveArray: any = [];


  constructor(public dataService:DataService, public varService:VariablesService){}

  selectUser(index: number) {
    this.selectedUserIndex = index;
    this.memberCache.push({
      number: this.memberCache.length,
      member: this.dataService.userData[index].name,
      id: index,
    });
    this.varService.setVar('sign', false);
  }

  showInfo(index: number): void {
    this.showInfoBox = index;
  }

  hideInfo(): void {
    this.showInfoBox = -1;
  }

  addSign() {
    this.varService.setVar('sign', true);
  }

  send() {
    for (let i = 0; i < this.memberCache.length; i++) {
      let spanElement = document.getElementById(`span${i}`);
      let pElement = document.getElementById(`p${i}`);

      let spanElementHTML = spanElement?.innerText;
      let pElementHTML = pElement?.innerText;

      if (pElementHTML && spanElementHTML) {
        pElementHTML = pElementHTML.replace(spanElementHTML, '');
      }

      this.saveArray.push({
        span: spanElementHTML,
        p: pElementHTML,
        userId: this.memberCache[i].id,
      });
    }
  }

}
