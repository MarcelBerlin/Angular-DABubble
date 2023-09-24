import { Component } from '@angular/core';
import { EmojiPickerBossiService } from './services/emoji-picker-bossi.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { UserToMessageService } from '../user-to-message/user-to-message.service';
import { VariablesService } from '../services/variables.service';
import { DataService } from '../services/data.service';
import { MessageInputServiceService } from '../message-input/service/message-input-service.service';

@Component({
  selector: 'app-emoji-picker-bossi',
  templateUrl: './emoji-picker-bossi.component.html',
  styleUrls: ['./emoji-picker-bossi.component.scss']
})
export class EmojiPickerBossiComponent {
  emojiDatabase: any[] = [];
  selcectedEmoji: any[] = [];
  emojiGroupList: any[] = [];
  emojisGroup0: any[] = [];
  emojisGroup1: any[] = [];
  emojisGroup2: any[] = [];
  emojisGroup3: any[] = [];
  emojisGroup4: any[] = [];
  emojisGroup5: any[] = [];
  emojisGroup6: any[] = [];
  emojisGroup7: any[] = [];
  emojisGroup8: any[] = [];
  allEmojisGroups: any[] = [];
  footerEmoji: any;
  footerGroup: string = '';
  footerName: string = '';
  searchField: string = '';
  searchResults: any[] = [];
  searchfieldActive: boolean = false;
  selectedGroup: number = 0;


  constructor(
    private emojiService: EmojiPickerBossiService,
    private directChatService: DirectChatService,
    private userToMessageService: UserToMessageService,
    private varService: VariablesService,
    private dataService: DataService,
    private messageInputService: MessageInputServiceService
  ) { }


  /**
   * Lifecycle hook executed when the component is initialized.
   * Loads emojis data using the 'emojiService.loadEmojisData()' method.
   * Updates the 'emojiDatabase' property with the loaded data and creates a 
   * list of unique emoji groups using 'createGroupList()'.
   * Handles success and error cases.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.emojiService.loadEmojisData().subscribe(
      (data) => {
        this.emojiDatabase = data;
        this.createGroupList();
      },
      (error) => {
        console.error('Fehler beim Laden der Daten:');
      }
    );
    // this.router.navigate(['/']);
  }


  /**
   * Creates a list of unique emoji groups from 'myEmojiArray'.
   * Checks if an emoji group is not already in 'emojiGroupList', and adds it if not present.
   * Calls the 'fillEmojisGroups()' function to handle further emoji grouping logic based on the 
   * obtained emoji groups.
   * 
   * @returns {void}
   */
  createGroupList(): void {
    this.emojiDatabase.forEach(element => {
      let groupName = element.group;
      if (!this.emojiGroupList.includes(groupName)) {
        this.emojiGroupList.push(groupName);
      }
    });
    this.fillEmojisGroups();
  }


  /**
   * Creates a list of unique emoji groups from 'myEmojiArray'.
   * Calls the 'fillEmojisGroups()' function to handle emoji grouping logic based on the emoji groups obtained.
   * 
   * @returns {void}
   */
  fillEmojisGroups(): void {
    this.emojiDatabase.forEach(element => {
      let emojiJson = { emoji: element.emoji, name: element.name, group: element.group };
      if (element.group == this.emojiGroupList[0]) this.emojisGroup0.push(emojiJson);
      if (element.group == this.emojiGroupList[1]) this.emojisGroup1.push(emojiJson);
      if (element.group == this.emojiGroupList[2]) this.emojisGroup2.push(emojiJson);
      if (element.group == this.emojiGroupList[3]) this.emojisGroup3.push(emojiJson);
      if (element.group == this.emojiGroupList[4]) this.emojisGroup4.push(emojiJson);
      if (element.group == this.emojiGroupList[5]) this.emojisGroup5.push(emojiJson);
      if (element.group == this.emojiGroupList[6]) this.emojisGroup6.push(emojiJson);
      if (element.group == this.emojiGroupList[7]) this.emojisGroup7.push(emojiJson);
      if (element.group == this.emojiGroupList[8]) this.emojisGroup8.push(emojiJson);
    });
    this.collectAllEmojisGroups();
  }

  /**
   * Collects and organizes multiple emoji groups into a single array.
   * Sets the 'allEmojisGroups' array to contain references to individual emoji groups.
   * Sets the 'emojiDatabase' to point to the first emoji group in 'allEmojisGroups'.
   * 
   * @returns {void}
   */
  collectAllEmojisGroups(): void {
    this.allEmojisGroups = [
      this.emojisGroup0,
      this.emojisGroup1,
      this.emojisGroup2,
      this.emojisGroup3,
      this.emojisGroup4,
      this.emojisGroup5,
      this.emojisGroup6,
      this.emojisGroup7,
      this.emojisGroup8,
    ];
  }


  /**
   * Updates the footer properties to display information about the selected emoji.
   * 
   * @param {any} x - The emoji object containing information about the selected emoji.
   * @returns {void}
   */
  showInFooter(x: any): void {
    this.footerEmoji = x.emoji;
    this.footerGroup = x.group;
    this.footerName = x.name;
  }


  /**
   * Clears the footer properties to hide emoji information in the footer.
   * @returns {void}
   */
  notShowFooter(): void {
    this.footerEmoji = '';
    this.footerGroup = '';
    this.footerName = '';
  }


  /**
   * Inserts an emoji into a chat message based on the current chat context.
   * 
   * @param {any} x - The emoji object to insert.
   * @returns {void}
   */
  setEmoji(x: any): void {
    if(this.varService.mainChatHead == 1 && !this.currentUser()){
      // this.directChatService.directMessage += x.emoji;
      this.messageInputService.insertEmoji(x.emoji);
    }
    if(this.varService.mainChatHead == 1 && this.currentUser()){
      // this.userToMessageService.insertEmoji(x.emoji);
      this.messageInputService.insertEmoji(x.emoji);
    }
    this.emojiService.toggleEmojiSelector();
  }


  /**
   * Check if the currently logged-in user matches the selected user to message based on 
   * their email addresses.
   * 
   * @returns {boolean} - `true` if the currently logged-in user matches the selected user;
   * otherwise, `false`
   */
  currentUser(): boolean {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }


  /**
   * Searches for emojis based on the content of the search field.
   * Populates 'searchResults' array with matching emoji data.
   * Converts search field and emoji data to lowercase for case-insensitive search.
   * Updates 'searchfieldActive' based on the presence of search results.
   * 
   * @returns {void}
   */
  searchFunction(): void {
    this.searchResults = [];
    this.searchField = this.searchField.trim().toLowerCase();
    if (this.searchFieldNotEmty()) {
      this.searchfieldActive = true;
      this.selectedGroup = -1;
      for (let i = 0; i < this.emojiDatabase.length; i++) {
        let name: string = this.emojiDatabase[i].name.toLowerCase();
        let group: string = this.emojiDatabase[i].group.toLowerCase();
        if (this.searchValueFound(name, group)) this.searchResults.push(this.createResultArray(i));
      }
    } else{
      this.searchfieldActive = false;
      this.selectedGroup = 0;
    } 
  }


  /**
   * Checks if the search field is not empty.
   * 
   * @returns {boolean} - 'true' if search field is not empty, 'false' otherwise.
   */
  searchFieldNotEmty(): boolean {
    return this.searchField.length > 0;
  }


  /**
   * Checks if the search value is found in the emoji's name or group.
   * 
   * @param {string} name - The lowercase name of the emoji.
   * @param {string} group - The lowercase group of the emoji.
   * @returns {boolean} - 'true' if search value is found, 'false' otherwise.
   */
  searchValueFound(name: string, group: string): boolean {
    return name.includes(this.searchField) || group.includes(this.searchField)
  }


  /**
   * Creates a result array with matching emoji data.
   * @param {number} i - The index of the emoji in the 'emojiDatabase'.
   * @returns {any} - Result array with emoji data.
   */
  createResultArray(i: number): any {
    return {
      emoji: this.emojiDatabase[i].emoji,
      name: this.emojiDatabase[i].name,
      group: this.emojiDatabase[i].group
    }
  }


  /**
   * Displays the emojis from the specified group.
   * @param {number} groupNumber - The index of the emoji group to be displayed.
   * @returns {void}
   */
  showGroup(groupNumber: number): void {
    this.selectedGroup = groupNumber;
  }
}
