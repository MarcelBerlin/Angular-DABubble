import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';

@Component({
  selector: 'app-main-chat-multi-message-head',
  templateUrl: './main-chat-multi-message-head.component.html',
  styleUrls: ['./main-chat-multi-message-head.component.scss'],
})
export class MainChatMultiMessageHeadComponent {
  inputValue: string = '';
  selectedArray: any[];
  setItem: string = '';
  sign: string = '';

  constructor(
    public dataService: DataService,
    private dialogAddService: DialogAddService
  ) {}

  inputAsValue() {
    if (!this.inputValue) {
      this.selectedArray = null;
      return null;
    }
    this.setItem = this.inputValue.charAt(0) === '@' ? 'email' : 'name';
    this.selectedArray = this.inputValue.charAt(0) === '#'
      ? this.dialogAddService.tagsData
      : this.dataService.userData;
    this.sign = this.inputValue.charAt(0);
    return this.selectedArray;
  }

  indexOfSelection(index: number) {
    console.log('array',this.selectedArray);
    console.log('Index:', index);
    console.log('setItem',this.setItem);
    
    console.log('zeichen:', this.sign);
    console.log(this.sign,this.selectedArray[index][this.setItem]);
    
    
  }
}
