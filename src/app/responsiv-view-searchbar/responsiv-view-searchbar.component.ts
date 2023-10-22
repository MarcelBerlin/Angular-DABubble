import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';
import { ConditionService } from 'src/app/services/condition.service';
@Component({
  selector: 'app-responsiv-view-searchbar',
  templateUrl: './responsiv-view-searchbar.component.html',
  styleUrls: ['./responsiv-view-searchbar.component.scss']
})
export class ResponsivViewSearchbarComponent {
  emailArray: any[] = [];
  nameArray: any[] = [];
  // findingsArray: any[] = [];
  channelArray: any[] = [];
  emailSearch: boolean = false;
  termSearch: boolean = false;
  channelSearch: boolean = false;
  

  constructor(
    public varService: VariablesService,
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    public conditionService: ConditionService
  ) {
  }


  responsiveSearchBar = new FormGroup({
    searchTerm: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}.?[a-zA-Z]{0,2}',),
      Validators.minLength(8),])
  });


  getSearchValue() {
    this.resetFindingsArrays();
    this.resetSearchCategory();
    const enteredStringTrimmed = this.getTrimmedLowerCaseSearchTerm();
    this.createFindingsArraysInUserData(enteredStringTrimmed);
    this.createFindingsArrayChannels(enteredStringTrimmed);
    console.log(this.nameArray, this.emailArray, this.channelArray);
  }


  resetFindingsArrays(): void {
    this.emailArray = [];
    // this.findingsArray = [];
    this.nameArray = [];
    this.channelArray = [];
  }


  resetSearchCategory(): void {
    this.emailSearch = false;
    this.termSearch = false;
    this.channelSearch = false;
  }


  createFindingsArraysInUserData(enteredStringTrimmed: string): void {
    let index = 0;
    this.dataService.userData.forEach(data => {
      let emailLowerCase = data.email.toLowerCase();
      let nameLowerCase = data.name.toLowerCase();
      if (this.nameFound(nameLowerCase, enteredStringTrimmed) && !this.emailSearch && !this.channelSearch) {
        this.nameArray.push({ term: data.name, index: index });
      }
      if (this.emailFound(emailLowerCase, enteredStringTrimmed) && !this.channelSearch) {
        this.emailArray.push({ term: data.email, index: index });
      }
      index++;
    });
  }


  createFindingsArrayChannels(enteredStringTrimmed: string): void {
    let index = 0;
    this.dialogAddService.tagsData.forEach((channel) => {
      let channelNameLowerCase = channel.name.toLowerCase();
      if (this.channelFound(channelNameLowerCase, enteredStringTrimmed) && !this.emailSearch){
        this.channelArray.push({ term: channel.name, index: index });
      }
      index++;
    });
  }


  getTrimmedLowerCaseSearchTerm(): string {
    const enteredString = this.responsiveSearchBar.value.searchTerm;
    this.responsiveSearchBar.get('searchTerm').setValue(enteredString.trim());
    let enteredStringTrimmed = this.responsiveSearchBar.value.searchTerm.toLocaleLowerCase();
    if (enteredStringTrimmed[0] == '@') {
      enteredStringTrimmed = enteredStringTrimmed.substring(1);
      console.log('emailsearch', enteredStringTrimmed);
      this.emailSearch = true;
    } else if (enteredStringTrimmed[0] == '#') {
      enteredStringTrimmed = enteredStringTrimmed.substring(1);
      this.channelSearch = true;
      console.log('channelsearch', enteredStringTrimmed);
    } else console.log('termsearch');
    return enteredStringTrimmed;
  }


  nameFound(nameLowerCase: string, enteredStringTrimmed: string): boolean {
    return nameLowerCase.includes(enteredStringTrimmed);
  }


  emailFound(emailLowerCase: string, enteredStringTrimmed: string): boolean {
    return emailLowerCase.includes(enteredStringTrimmed);
  }


  channelFound(channelNameLowerCase: string, enteredStringTrimmed: string): boolean {
    return channelNameLowerCase.includes(enteredStringTrimmed);
  }


  findIndexInArray(array: string[], searchValue: string): number {
    return array.findIndex(item => item === searchValue);
  }

}
