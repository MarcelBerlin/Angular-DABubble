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
}
