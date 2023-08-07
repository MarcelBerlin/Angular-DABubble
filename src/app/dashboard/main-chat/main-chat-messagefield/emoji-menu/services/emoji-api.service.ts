import { Injectable } from '@angular/core';
import * as emoji from "emoji-api"
import { VariablesService } from 'src/app/services/variables.service';
@Injectable({
  providedIn: 'root'
})
export class EmojiApiService {
  emojiDatabase: any[];
  selcectedEmoji: any[];
  emojiSelectorActive: boolean = false;
  myEmojiArray: any[] = [];
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


  constructor(
    private varService: VariablesService
  ) {
    this.createEmojiGroups();
  }


  /**
   * Toggles the emoji selector based on the 'mainChatHead'(1 and 2 are directChat) value from the 
   * 'varService'. If 'mainChatHead' is equal to 1 or 2, the emoji selector is toggled, otherwise, 
   * it is set to false(close the emoji menu).
   * 
   * @returns {void}
   */
  toggleEmojiSelector(): void {
    if (this.varService.mainChatHead == 1 || this.varService.mainChatHead == 2) {
      this.emojiSelectorActive = !this.emojiSelectorActive;
    } else this.emojiSelectorActive = false;
  }


  /**
   * Creates emoji groups and populates them into the 'myEmojiArray' array.
   * Calls the 'createGroupList()' function for further grouping logic (implementation not shown).
   * 
   * @returns {void}
   */
  createEmojiGroups(): void {
    let i: number = 0;
    emoji.all().forEach((ele: any) => {
      console.log(emoji.get(ele.emoji).group);
      let myEmoji = emoji.get(ele.emoji);
      this.myEmojiArray.push(myEmoji);
    });
    this.createGroupList();
  }


  /**
   * Creates a list of unique emoji groups from 'myEmojiArray'.
   * Checks if an emoji group is not already in 'emojiGroupList', and adds it if not present.
   * Logs the 'emojiGroupList' to the console (for demonstration purposes).
   * Calls the 'fillEmojisGroups()' function to handle further emoji grouping logic based on the 
   * obtained emoji groups.
   * 
   * @returns {void}
   */
  createGroupList(): void {
    this.myEmojiArray.forEach(element => {
      let groupName = element.group;
      if (!this.emojiGroupList.includes(groupName)) {
        this.emojiGroupList.push(groupName);
      }
    });
    console.log(this.emojiGroupList);
    this.fillEmojisGroups();
  }


  /**
   * Creates a list of unique emoji groups from 'myEmojiArray'.
   * Calls the 'fillEmojisGroups()' function to handle emoji grouping logic based on the emoji groups obtained.
   * 
   * @returns {void}
   */
  fillEmojisGroups(): void {
    this.myEmojiArray.forEach(element => {
      if (element.group == this.emojiGroupList[0]) this.emojisGroup0.push(element.emoji);
      if (element.group == this.emojiGroupList[1]) this.emojisGroup1.push(element.emoji);
      if (element.group == this.emojiGroupList[2]) this.emojisGroup2.push(element.emoji);
      if (element.group == this.emojiGroupList[3]) this.emojisGroup3.push(element.emoji);
      if (element.group == this.emojiGroupList[4]) this.emojisGroup4.push(element.emoji);
      if (element.group == this.emojiGroupList[5]) this.emojisGroup5.push(element.emoji);
      if (element.group == this.emojiGroupList[6]) this.emojisGroup6.push(element.emoji);
      if (element.group == this.emojiGroupList[7]) this.emojisGroup7.push(element.emoji);
      if (element.group == this.emojiGroupList[8]) this.emojisGroup8.push(element.emoji);
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
    this.emojiDatabase = this.allEmojisGroups[0];
  }
}