import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-main-chat-multi-message-head',
  templateUrl: './main-chat-multi-message-head.component.html',
  styleUrls: ['./main-chat-multi-message-head.component.scss'],
})
export class MainChatMultiMessageHeadComponent {
  inputValue: string = '';
  selectedArray: string = '';
  property: string = '';
  sign: string = '';

  constructor(
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    private varService: VariablesService
  ) {}

  inputAsValue() {
    if (!this.inputValue) {
      this.selectedArray = null;
      return null;
    }
    this.property = this.inputValue.charAt(0) === '@' ? 'email' : 'name';
    this.selectedArray =
      this.inputValue.charAt(0) === '#'
        ? this.dialogAddService.tagsData
        : this.dataService.userData;
    this.sign = this.inputValue.charAt(0);
    return this.selectedArray;
  }

  indexOfSelection(index: number) {
    this.varService.setVar('selectedArrayofSearch', this.selectedArray);
    this.varService.setVar('propertyOfSearch', this.property);
    this.varService.setVar('signOfSearch', this.sign);
    this.varService.setVar('indexOfSearch', index);
  }
}
