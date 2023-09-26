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
  


  constructor() {}


  /**
   * Sets the value of a boolean variable and notifies observers.
   *
   * @param {boolean} newValue - The new boolean value to set.
   * @returns {void}
   */
  setMyVariable(newValue: boolean):void {
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
  insertFileLink():void {
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
  resetVariables():void {
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
  openInNewTab(href: string){
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
  ) {
      isPDFFile = true;
  }

  return isPDFFile;
}
}
