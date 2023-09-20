import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageInputServiceService {

  private myVariableSubject = new BehaviorSubject<boolean>(false);
  myVariable$: Observable<boolean> = this.myVariableSubject.asObservable();

  setMyVariable(newValue: boolean) {
    this.myVariableSubject.next(newValue);
  }



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



  constructor() {

  }


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


  insertFileLink() {
    this.setId += 1;
    this.emailContent = 'unset';
    this.class = 'member';
    this.name = 'unset';
    this.nameType = 'FileType';
    this.userId = '';
    this.setMyVariable(true);
  }


  resetVariables() {
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
