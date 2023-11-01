import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';
import { ConditionService } from 'src/app/services/condition.service';
import { DashboardComponentsShowHideService } from '../dashboard/dashboard-components-show-hide.service';
import { MessageService } from '../services/messages.service';
import { MessageInputServiceService } from '../message-input/service/message-input-service.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { NewMessageAmountService } from '../direct-chat/services/new-message-amount.service';
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
    private directChatService: DirectChatService,
    private newMessageAmountService: NewMessageAmountService
  ) {}


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
        this.nameArray.push({ term: data.name, index: index, type: 'name'});
      }
      if (this.emailFound(emailLowerCase, enteredStringTrimmed) && !this.channelSearch) {
        this.emailArray.push({ term: data.email, index: index, type: 'email'});
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
      if (this.channelFound(channelNameLowerCase, enteredStringTrimmed) && !this.emailSearch){
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
    else this.openDirectChat(index);
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


  /**
   * Opens a direct chat or performs user-specific actions based on the provided arrayId.
   *
   * @param {number} arrayId - The index or identifier of the chat or user to open.
   * @returns {void}
   */
  openDirectChat(arrayId: number): void {
    this.currentUser()
      ? this.openDirectChatLoggedUser(arrayId)
      : this.openDirectChatToSpecificUser(arrayId);
    this.varService.previousScrollTop = 0;
    this.getDirectChatData(arrayId);
  }


  /**
   * Opens a direct chat for a logged-in user with the specified arrayId.
   *
   * @param {number} arrayId - The identifier of the chat or user to open.
   * @returns {void}
   */
  openDirectChatLoggedUser(arrayId: number): void {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
  }


  /**
   * Opens a direct chat to a specific user with the specified arrayId.
   *
   * @param {number} arrayId - The identifier of the chat or user to open.
   * @returns {void}
   */
  openDirectChatToSpecificUser(arrayId: number): void {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
  }


  /**
   * Checks if the currently logged-in user matches the selected user for messaging.
   *
   * @returns {boolean} True if the currently logged-in user matches the selected user, false otherwise.
   */
  currentUser(): boolean {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }


  /**
   * Retrieves data for a direct chat based on the provided arrayId and performs necessary actions.
   *
   * @param {number} arrayId - The index or identifier of the chat or user to get data for.
   * @returns {void}
   */
  getDirectChatData(arrayId: number): void {
    if (this.directChatService.directChatActive) {
      this.messageInputService.chatChange = true;
      const clickedUserId: string = this.dataService.userData[arrayId].id;
      const clickedUserName: string = this.dataService.userData[arrayId].name;
      this.messageInputService.placeholderUserName = clickedUserName; 
      this.messageInputService.placeholderText = 'Nachricht an ' + clickedUserName;
      this.directChatService.getChatId(clickedUserId);
      this.newMessageAmountService.actualPartnerUserDataIndex = arrayId;
      this.messageInputService.setMyVariable(true);
      setTimeout(() => {
        this.newMessageAmountService.setOwnMessageAmountToZero();
      }, 1000);
    }
  }
}
