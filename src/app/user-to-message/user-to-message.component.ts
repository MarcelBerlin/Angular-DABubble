import { Component, ElementRef, ViewChild, Directive, HostListener } from '@angular/core';
import { DataService } from '../services/data.service';
import { VariablesService } from '../services/variables.service';
import { UserToMessageService } from './user-to-message.service';
import { FileUploadService } from '../file-upload/services/file-upload.service';

@Component({
  selector: 'app-user-to-message',
  templateUrl: './user-to-message.component.html',
  styleUrls: ['./user-to-message.component.scss'],
})

export class UserToMessageComponent {
  selectedUserIndex!: number;
  invisibleSign: string = '\u200B'; // verstecktes Zeichen
  firstTimeClicked = true;
  TimeoutArray = [];
  @ViewChild('inputP', { static: false }) inputP: ElementRef;
  @ViewChild('inputDiv', { static: false }) inputDiv: ElementRef;

  constructor(
    public dataService: DataService,
    public varService: VariablesService,
    public userToMessageService: UserToMessageService,
    private fileUploadService: FileUploadService,
    private el: ElementRef,
  ) { }


  showInfoInput(index: number) {
    this.userToMessageService.showInfoBox = index;
    const timeoutId = setTimeout(() => {
      this.hideInfoInput();
    }, 5000)
    this.TimeoutArray.push(timeoutId);
    for (let i = 0; i < this.TimeoutArray.length - 1; i++) {
      clearTimeout(this.TimeoutArray[i]);
    }
    this.TimeoutArray = this.TimeoutArray.slice(this.TimeoutArray.length - 1, this.TimeoutArray.length);
  }


  hideInfoInput = () => (this.userToMessageService.showInfoBox = -1);


  selectedUser(index: number) {
    this.userToMessageService.memberCache.push({
      number: this.userToMessageService.memberCache.length,
      member: this.dataService.userData[index].name,
      id: index,
      email: this.dataService.userData[index].email,
      userId: this.dataService.userData[index].userId,
      filelink: 'unset',
      filename: 'unset',
    });
    this.varService.setVar('sign', false);
    this.userToMessageService.contentLength += 10;
    this.userToMessageService.placeholderView = false;
  }



  onContentChange(event: any) {
    this.userToMessageService.getContentLength();
  }


  moveCursorToBeginning() {
    this.userToMessageService.placeholderView = false;
    if (this.userToMessageService.contentLength == 0) {
      const el = this.inputP.nativeElement;
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(el.firstChild, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    }
    if (this.firstTimeClicked) {
      this.setCursorWithDoubleClick();
    }
  }


  setCursorWithDoubleClick(): void {
    this.firstTimeClicked = false;
    const el = this.inputP.nativeElement;
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.firstChild, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    const doubleClickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    el.dispatchEvent(doubleClickEvent);
  }


  checkPlaceholder() {
    this.userToMessageService.getContentLength();
    setTimeout(() => {
      if (this.userToMessageService.contentLength == 1) {
        this.userToMessageService.placeholderView = true;
      }
    }, 500);
  }


  deleteFile(i: number) {
    const filepath = this.userToMessageService.memberCache[i].filelink;
    this.fileUploadService.deleteFile(filepath);
    this.userToMessageService.memberCache[i].filelink = 'unset';
    this.userToMessageService.memberCache[i].filename = 'unset';
    setTimeout(() => {
      this.userToMessageService.getContentLength();
    }, 700);
  }


  deleteUserRef(i: number) {
    this.userToMessageService.memberCache[i].email = 'unset';
    this.userToMessageService.memberCache[i].member = 'unset';
    this.userToMessageService.memberCache[i].userId = 'unset';
    setTimeout(() => {
      this.userToMessageService.getContentLength();
    }, 500);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const currentNode = range.startContainer;
    // console.log('keydown Name: ', currentNode.nodeName);
    // console.log('keydown Key:  ', event.key);
    // Überprüfen, ob der aktuelle Knoten ein <p>-Tag ist
    if ((currentNode.nodeName === 'P' && event.key === 'Delete') ||
      (currentNode.nodeName === 'P' && event.key === 'Backspace')) {
      console.log('prevent deletion');
      event.preventDefault();
      // this.moveCursorOneLeft();
    }
  }


  moveCursorOneLeft(): void {
    console.log('move cursor started');
    if (this.userToMessageService.contentLength != 1) {
      const editableDiv = this.inputDiv.nativeElement;
      console.log('move left init');
      // Erstellen Sie eine Auswahl (Selection) im bearbeitbaren Div
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      console.log(range.startOffset);

      // Überprüfen, ob sich der Cursor am Anfang der Div befindet
      if (range.startContainer.nodeName === 'P') {
        const offset = range.startOffset;
        if (offset > 0) {
          range.setStart(range.startContainer, offset - 1);
          range.setEnd(range.startContainer, offset - 1);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  }


}
