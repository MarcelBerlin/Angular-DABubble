import { Component, ElementRef, ViewChild } from '@angular/core';
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
   @ViewChild('inputP', { static: false }) inputP: ElementRef;

  constructor(
    public dataService: DataService,
    public varService: VariablesService,
    public userToMessageService: UserToMessageService,
  ) { }

  showInfoInput = (index: number) => (this.userToMessageService.showInfoBox = index);


  hideInfoInput = () => (this.userToMessageService.showInfoBox = -1);


  // calculateIndexInput = (): number => (this.userToMessageService.memberCache[this.userToMessageService.showInfoBox].id);


  selectedUser(index: number) {
    this.userToMessageService.memberCache.push({
      number: this.userToMessageService.memberCache.length,
      member: this.dataService.userData[index].name,
      id: index,
      email: this.dataService.userData[index].email,
      userId: this.dataService.userData[index].userId,
      filelink: 'unset',
      filename: 'unset',
    });
    this.varService.setVar('sign', false);
    this.userToMessageService.contentLength += 1;
    this.userToMessageService.placeholderView = false;
  }

  onContentChange(event: any) {
    const innerText = event.target.innerText.toString().trim();
    this.userToMessageService.contentLength = innerText.length -1;
    console.log(innerText.toString());
    console.log(innerText.length);
  }

  // @ViewChild('inputDiv', { static: false }) inputDiv: ElementRef;
 


  moveCursorToBeginning() {
    this.userToMessageService.placeholderView = false;
    if(this.userToMessageService.contentLength == 0){
      
    const el = this.inputP.nativeElement;
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.firstChild, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    }
  }


  checkPlaceholder() {
    setTimeout(() => {
      if (this.userToMessageService.contentLength == 0 || this.userToMessageService.contentLength == -1) {
        this.userToMessageService.placeholderView = true;
      }
      console.log(this.userToMessageService.contentLength);
      console.log(this.userToMessageService.placeholderView);

     }, 500); 
    
  }
}
