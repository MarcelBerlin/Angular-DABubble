import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { VariablesService } from '../services/variables.service';

@Component({
  selector: 'app-user-to-message',
  templateUrl: './user-to-message.component.html',
  styleUrls: ['./user-to-message.component.scss'],
})
  
export class UserToMessageComponent {
  // @ViewChild('editableDiv') editableDiv!: ElementRef;

  memberCache = [{ number: 0, member: '', id: 0 }]; // Zwischenspeicher
  selectedUserIndex!: number;
  invisibleSign: string = '\u200B'; // verstecktes Zeichen
  showInfoBox: number = -1;
  saveArray: any = []; // das ist das array wo bei druck auf senden alles gespeichert wird

  constructor(
    public dataService: DataService,
    public varService: VariablesService
  ) {}

  showInfoInput = (index: number) => (this.showInfoBox = index);
  hideInfoInput = () => (this.showInfoBox = -1);
  calculateIndexInput = (): number => (this.memberCache[this.showInfoBox].id);
  
  showInfoOutput =(index: number) => (this.showInfoBox = index);
  hideInfoOutput = () => (this.showInfoBox = -1);
  calculateIndexOutput = (): number => (this.saveArray[this.showInfoBox].userId);

  // mit click auf den user wird der selectedUser in den Zwischenspeicher gespeichert
  selectedUser(index: number) {
    this.selectedUserIndex = index;
    this.memberCache.push({
      number: this.memberCache.length,
      member: this.dataService.userData[index].name,
      id: index,
    });
    this.varService.setVar('sign', false);
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
    this.memberCache = [{ number: 0, member: '', id: 0 }];
    console.log(this.saveArray);
  }
}
