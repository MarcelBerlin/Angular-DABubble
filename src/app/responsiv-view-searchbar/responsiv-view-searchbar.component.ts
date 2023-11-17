import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';
import { ConditionService } from 'src/app/services/condition.service';
import { DashboardComponentsShowHideService } from '../dashboard/dashboard-components-show-hide.service';
import { MessageService } from '../services/messages.service';
import { MessageInputServiceService } from '../message-input/service/message-input-service.service';
// import { DirectChatService } from '../direct-chat/services/direct-chat.service';
// import { NewMessageAmountService } from '../direct-chat/services/new-message-amount.service';
import { MessageToUserService } from '../direct-chat/services/message-to-user.service';

@Component({
  selector: 'app-responsiv-view-searchbar',
  templateUrl: './responsiv-view-searchbar.component.html',
  styleUrls: ['./responsiv-view-searchbar.component.scss']
})
export class ResponsivViewSearchbarComponent {
  emailArray: any[] = [];
  nameArray: any[] = [];
  findingsArray: any[] = [];
  channelArray: any[] = [];
  emailSearch: boolean = false;
  termSearch: boolean = false;
  channelSearch: boolean = false;
  responsiveSearchBar = new FormGroup({
    searchTerm: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}.?[a-zA-Z]{0,2}',),
      Validators.minLength(8),])
  });


  constructor(
    public varService: VariablesService,
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    public conditionService: ConditionService,
    private dcshService: DashboardComponentsShowHideService,
    private messageService: MessageService,
    private messageInputService: MessageInputServiceService,
    // private directChatService: DirectChatService,
    // private newMessageAmountService: NewMessageAmountService,
    private messageToUserService: MessageToUserService
  ) { }


  /**
   * Executes a search operation based on the entered search value.
   * It resets search-related data structures, performs the search, and logs the results.
   *
   * @returns {void}
   */
  getSearchValue(): void {
    this.resetFindingsArrays();
    this.resetSearchCategory();
    const enteredStringTrimmed = this.getTrimmedLowerCaseSearchTerm();
    this.createFindingsArraysInUserData(enteredStringTrimmed);
    this.createFindingsArrayChannels(enteredStringTrimmed);
    this.createFindingsArray();
  }


  /**
   * Resets search-related arrays for email, findings, names, and channels.
   *
   * @returns {void}
   */
  resetFindingsArrays(): void {
    this.emailArray = [];
    this.findingsArray = [];
    this.nameArray = [];
    this.channelArray = [];
  }


  /**
   * Resets search categories for email, term, and channel searches.
   *
   * @returns {void}
   */
  resetSearchCategory(): void {
    this.emailSearch = false;
    this.termSearch = false;
    this.channelSearch = false;
  }


  /**
   * Creates search result arrays for user data based on the entered search term.
   *
   * @param {string} enteredStringTrimmed - The trimmed and lowercase search term.
   * @returns {void}
   */
  createFindingsArraysInUserData(enteredStringTrimmed: string): void {
    let index = 0;
    this.dataService.userData.forEach(data => {
      let emailLowerCase = data.email.toLowerCase();
      let nameLowerCase = data.name.toLowerCase();
      if (this.nameFound(nameLowerCase, enteredStringTrimmed) && !this.emailSearch && !this.channelSearch) {
        this.nameArray.push({ term: data.name, index: index, type: 'name' });
      }
      if (this.emailFound(emailLowerCase, enteredStringTrimmed) && !this.channelSearch) {
        this.emailArray.push({ term: data.email, index: index, type: 'email' });
      }
      index++;
    });
  }


  /**
   * Creates a search result array for channels based on the entered search term.
   *
   * @param {string} enteredStringTrimmed - The trimmed and lowercase search term.
   * @returns {void}
   */
  createFindingsArrayChannels(enteredStringTrimmed: string): void {
    let index = 0;
    this.dialogAddService.tagsData.forEach((channel) => {
      let channelNameLowerCase = channel.name.toLowerCase();
      if (this.channelFound(channelNameLowerCase, enteredStringTrimmed) && !this.emailSearch) {
        this.channelArray.push({ term: channel.name, index: index, type: 'channel' });
      }
      index++;
    });
  }


  /**
   * Retrieves the trimmed and lowercase search term from the responsive search bar value.
   * It also sets search category flags based on the prefix of the search term.
   *
   * @returns {string} The trimmed and lowercase search term.
   */
  getTrimmedLowerCaseSearchTerm(): string {
    const enteredString = this.responsiveSearchBar.value.searchTerm;
    this.responsiveSearchBar.get('searchTerm').setValue(enteredString.trim());
    let enteredStringTrimmed = this.responsiveSearchBar.value.searchTerm.toLocaleLowerCase();
    if (enteredStringTrimmed[0] == '@') {
      enteredStringTrimmed = enteredStringTrimmed.substring(1);
      this.emailSearch = true;
    } else if (enteredStringTrimmed[0] == '#') {
      enteredStringTrimmed = enteredStringTrimmed.substring(1);
      this.channelSearch = true;
    } else if (enteredStringTrimmed.length > 0) this.termSearch = true;
    return enteredStringTrimmed;
  }


  /**
   * Checks if the provided name (in lowercase) contains the entered search term.
   *
   * @param {string} nameLowerCase - The name to search in lowercase.
   * @param {string} enteredStringTrimmed - The trimmed and lowercase search term.
   * @returns {boolean} True if the name contains the search term, false otherwise.
   */
  nameFound(nameLowerCase: string, enteredStringTrimmed: string): boolean {
    return nameLowerCase.includes(enteredStringTrimmed);
  }


  /**
   * Checks if the provided email (in lowercase) contains the entered search term.
   *
   * @param {string} emailLowerCase - The email to search in lowercase.
   * @param {string} enteredStringTrimmed - The trimmed and lowercase search term.
   * @returns {boolean} True if the email contains the search term, false otherwise.
   */
  emailFound(emailLowerCase: string, enteredStringTrimmed: string): boolean {
    return emailLowerCase.includes(enteredStringTrimmed);
  }


  /**
   * Checks if the provided channel name (in lowercase) contains the entered search term.
   *
   * @param {string} channelNameLowerCase - The channel name to search in lowercase.
   * @param {string} enteredStringTrimmed - The trimmed and lowercase search term.
   * @returns {boolean} True if the channel name contains the search term, false otherwise.
   */
  channelFound(channelNameLowerCase: string, enteredStringTrimmed: string): boolean {
    return channelNameLowerCase.includes(enteredStringTrimmed);
  }


  /**
   * Finds the index of the provided searchValue in the given array.
   *
   * @param {string[]} array - The array to search.
   * @param {string} searchValue - The value to search for in the array.
   * @returns {number} The index of the searchValue in the array, or -1 if not found.
   */
  findIndexInArray(array: string[], searchValue: string): number {
    return array.findIndex(item => item === searchValue);
  }


  /**
   * Combines the search result arrays for names, emails, and channels into a single findings array.
   *
   * @returns {void}
   */
  createFindingsArray(): void {
    this.nameArray.forEach(name => {
      this.findingsArray.push(name);
    });
    this.emailArray.forEach(email => {
      this.findingsArray.push(email);
    });
    this.channelArray.forEach(channel => {
      this.findingsArray.push(channel);
    });
  }


  /**
   * Opens the chat or channel based on the provided type and index.
   *
   * @param {number} index - The index of the chat or channel to be opened.
   * @param {string} type - The type of the chat (either 'channel' or 'user').
   * @returns {void}
   */
  openApplicableChat(index: number, type: string): void {
    if (type == 'channel') this.openChannel(index);
    else if (type == 'name' || type == 'email') {
      this.messageToUserService.messageToUser(index);
    }
  }


  /**
   * Opens the selected channel and performs necessary operations.
   *
   * @param {number} arrayId - The index of the selected channel in the channel array.
   * @returns {Promise<void>} A Promise that resolves when the channel is successfully opened.
   */
  async openChannel(arrayId: number): Promise<void> {
    this.varService.setVar('mainChatHead', 0);
    this.varService.setVar('selectedChannel', arrayId);
    this.dialogAddService.channelIndex = arrayId;
    const selectedChannel = this.dialogAddService.tagsData[arrayId];
    this.messageInputService.placeholderUserName = selectedChannel.name;
    this.messageInputService.placeholderText = 'Nachricht an ' + selectedChannel.name;
    const channelId = selectedChannel.id;
    if (innerWidth <= 800) this.dcshService.hideNavigation = true;
    await this.messageService.onChannelClick(channelId);
  }


  // Test ! Einbinden der Desktop Searchbar

  actualUser: any;
  control = new FormControl('');
  filteredArrays: Observable<string[]>;
  selectedArray: any = [];
  property: string = '';
  innerWidth: number = 0;

  @ViewChild('inputField') inputField!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
  }


  ngOnInit() {
    this.filteredArrays = this.control.valueChanges.pipe(
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (filterValue.startsWith('#')) {
      this.property = 'name';
      this.selectedArray = this.dialogAddService.tagsData;
      return this.dialogAddService.tagsData.filter((element) =>
        this._normalizeValue(element.name).includes(filterValue)
      );
    } else if (filterValue.startsWith('@')) {
      this.property = 'email';
      this.selectedArray = this.dataService.userData;
      return this.dataService.userData.filter((element) =>
        this._normalizeValue(element.email).includes(filterValue)
      );
    } else if (filterValue.startsWith('')) {
      this.property = 'name';
      this.selectedArray = this.dataService.userData;
      return this.dataService.userData.filter((element) =>
        this._normalizeValue(element.name).includes(filterValue)
      );
    }

    return [];
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onOptionSelected(event: any) {
    const selectedOption = event.option.value;
    this.selectedArray.forEach((element, index) => {
      if (element.name === selectedOption) {
        this.varService.setVar('indexOfSearch', index);
        this.varService.setVar('selectedArrayofSearch', this.selectedArray);
        if (element.name.startsWith('#')) {
          this.messageService.openChannel(this.varService.indexOfSearch); // ADDED BY FELIX
        } else if (element.name.startsWith('')) {
          // this.messageService.messageToUser(this.varService.indexOfSearch); // ADDED BY FELIX
          this.messageToUserService.messageToUser(this.varService.indexOfSearch); // ADDED BY BOSSI
          this.inputField.nativeElement.value = '';
        }
      } else if (element.email === selectedOption) {
        this.varService.setVar('indexOfSearch', index);
        this.varService.setVar('selectedArrayofSearch', this.selectedArray);
        // this.messageService.messageToUser(this.varService.indexOfSearch); // ADDED BY FELIX
        this.messageToUserService.messageToUser(this.varService.indexOfSearch); // ADDED BY BOSSI
        this.inputField.nativeElement.value = '';
      }
    });
  }

}
