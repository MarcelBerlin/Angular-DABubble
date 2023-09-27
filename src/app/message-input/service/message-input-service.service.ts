import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageInputServiceService {
  private myVariableSubject = new BehaviorSubject<boolean>(false);
  myVariable$: Observable<boolean> = this.myVariableSubject.asObservable();
  inputLinks: any[] = [];
  textContent: string = 'unset';
  emailContent: string = 'unset';
  class: string = 'unset';
  linkTaget: string = 'unset';
  setId: number = -1;
  name: string = 'unset';
  filename: string = 'unset';
  nameType: string = 'unset';
  userId: string = 'unset';
  contentArray: any[] = [];
  showInputInfo: boolean = false;
  shownId: number = 0;
  placeholderUserName: string = '';
  placeholderText: string = 'Nachicht an';
  chatChange: boolean = false;

  sendButtonEnabled: boolean = false;
  placeholerView: boolean = false;


  constructor() { }


  /**
   * Sets the value of a boolean variable and notifies observers.
   *
   * @param {boolean} newValue - The new boolean value to set.
   * @returns {void}
   */
  setMyVariable(newValue: boolean): void {
    this.myVariableSubject.next(newValue);
  }


  /**
   * Inserts an emoji into the content and notifies observers.
   *
   * @param {string} emoji - The emoji to insert.
   * @returns {void}
   */
  insertEmoji(emoji): void {
    this.setId += 1;
    this.textContent = emoji;
    this.emailContent = 'unset';
    this.class = 'emoji';
    this.linkTaget = 'unset';
    this.name = 'unset';
    this.filename = 'unset';
    this.nameType = 'EmojiType';
    this.userId = '';
    this.setMyVariable(true);
  }


  /**
   * Inserts a file link into the content and notifies observers.
   *
   * @returns {void}
   */
  insertFileLink(): void {
    this.setId += 1;
    this.emailContent = 'unset';
    this.class = 'member';
    this.name = 'unset';
    this.nameType = 'FileType';
    this.userId = '';
    this.setMyVariable(true);
  }


  /**
   * Resets various properties to their default 'unset' values.
   *
   * @returns {void}
   */
  resetVariables(): void {
    this.textContent = 'unset';
    this.emailContent = 'unset';
    this.class = 'unset';
    this.linkTaget = 'unset';
    this.setId = -1;
    this.name = 'unset';
    this.filename = 'unset';
    this.nameType = 'unset';
    this.userId = 'unset';
  }


  /**
   * Opens a URL in a new browser tab or window.
   *
   * @param {string} href - The URL to open in a new tab.
   * @returns {void}
   */
  openInNewTab(href: string): void {
    console.log('openInNewTab', href);
    window.open(href, '_blank');
  }


  /**
   * Checks if a filename has a PDF file extension.
   *
   * @param {string} filename - The name of the file to be checked.
   * @returns {boolean} `true` if the file has a PDF extension, otherwise `false`.
   */
  fileIsPDF(filename: string): boolean {
    let isPDFFile = false;
    const filenameLength = filename.length;
    if (
      filename[filenameLength - 1] === 'f' &&
      filename[filenameLength - 2] === 'd' &&
      filename[filenameLength - 3] === 'p' &&
      filename[filenameLength - 4] === '.'
    ) isPDFFile = true;
    return isPDFFile;
  }



  /**
     * Check if the input type is 'EmojiType'.
     *
     * @returns {boolean} True if the input type is 'EmojiType', false otherwise.
     */
  emojiSelected(): boolean {
    return this.nameType == 'EmojiType';
  }


  /**
   * Check if a file is selected for upload.
   *
   * @returns {boolean} True if a file is selected, false otherwise.
   */
  fileUploadSelected(): boolean {
    return this.filename != 'unset';
  }


  /**
   * Check if the send button is pressed.
   *
   * @returns {boolean} True if the send button is pressed, false otherwise.
   */
  sendButtonPressed(): boolean {
    return this.nameType == 'unset'
      && this.setId == -1
      && !this.chatChange;
  }


  /**
   * Check if a new chat is selected.
   *
   * @returns {boolean} True if a new chat is selected, false otherwise.
   */
  newChatSelected(): boolean {
    return this.chatChange;
  }


  /**
     * Creates and returns a link information object based on properties from 'inputService'.
     *
     * @returns {object} - An object containing link information.
     * @property {string} textContent - The text content of the link.
     * @property {string} emailContent - The email content of the link.
     * @property {string} class - The CSS class of the link.
     * @property {string} linkTaget - The link target of the anchor element.
     * @property {number} setId - The identifier for this link.
     * @property {string} name - The name associated with the link.
     * @property {string} filename - The filename associated with the link.
     * @property {string} nameType - The type of name associated with the link.
     * @property {string} userId - The user ID associated with the link.
     */
  createLinkInfo(): object {
    return {
      textContent: this.textContent,
      emailContent: this.emailContent,
      class: this.class,
      linkTaget: this.linkTaget,
      setId: this.setId,
      name: this.name,
      filename: this.filename,
      nameType: this.nameType,
      userId: this.userId,
    };
  }


  /**
   * Creates a tag information object for 'A' and 'SPAN' HTML tags.
   *
   * @param {string} tagType - The type of HTML tag ('A' or 'SPAN').
   * @param {number} position - The position of the tag in the DOM.
   * @param {string} content - The content of the tag.
   * @returns {object} - A tag information object with properties.
   */
  createTagInfoForAandSPANTags(tagType: string, position: number, content: string): object {
    return {
      tagType: tagType,
      position: position,
      attributes: [{}],
      content: content,
      linkInfo: [{}],
    };
  }


  /**
   * Creates an information object for a text node in the content.
   *  
   * @param {number} position - The position of the text node in the content.
   * @param {string} content - The content of the text node.
   * @returns {Object} An object containing information about the text node.
    */
  createTextInfoForText(position: number, content: string): object {
    return {
      tagType: 'text',
      position: position,
      attributes: [{}],
      content: content,
      linkInfo: [{}],
    };
  }


  /**
   * Adds attributes to a tag information object.
   *
   * @param {NamedNodeMap} attributes - The attributes of a DOM element.
   * @param {any} tagInfo - The tag information object to which attributes will be added.
   * @returns {Object} The updated tag information object with attributes.
   */
  addTagAttributes(attributes: NamedNodeMap, tagInfo: any): Object {
    for (let j = 0; j < attributes.length; j++) {
      const attribute = attributes[j];
      let aInfo = { name: attribute.name, value: attribute.value };
      tagInfo.attributes[j] = aInfo;
    }
    return tagInfo;
  }


  /**
   * Adds link information to tag information objects based on attribute values.
   *
   * @returns {void}
   */
  addTagInfoLinkInfo(): void {
    this.contentArray.forEach(index => {
      if (index.attributes.length > 3) {
        index.linkInfo[0] = this.inputLinks[index.attributes[2].value];
      }
    });
  }


  enableSendButton(): void {
    let textLenght = document.getElementById('inputDiv').textContent.trim().length;
    if (textLenght == 0){
      this.sendButtonEnabled = false;
    } else  if (textLenght >= 1){
      this.sendButtonEnabled = true;
    }
  }
}
