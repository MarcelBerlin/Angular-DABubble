import { Component, ElementRef, ViewChild } from '@angular/core';
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
   @ViewChild('inputP', { static: false }) inputP: ElementRef;
   @ViewChild('invisible', { static: false }) invisible: ElementRef;

  constructor(
    public dataService: DataService,
    public varService: VariablesService,
    public userToMessageService: UserToMessageService,
    private fileUploadService: FileUploadService,
  ) { }


  TimeoutArray = [];
  // showInfoInput = (index: number) => (this.userToMessageService.showInfoBox = index);
  showInfoInput(index: number){
    this.userToMessageService.showInfoBox = index;
      const timeoutId = setTimeout(() => {
        this.hideInfoInput();
      }, 5000)
      this.TimeoutArray.push(timeoutId);
      for (let i = 0; i < this.TimeoutArray.length -1; i++) {
        clearTimeout(this.TimeoutArray[i]);
      }
      this.TimeoutArray = this.TimeoutArray.slice(this.TimeoutArray.length - 1, this.TimeoutArray.length);
  }


  hideInfoInput = () => (this.userToMessageService.showInfoBox = -1);


  // calculateIndexInput = (): number => (this.userToMessageService.memberCache[this.userToMessageService.showInfoBox].id);


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
    // this.userToMessageService.getContentLength();
    // const innerText2 = event.target.innerText.trim();
    // const innerText = event.target.innerText.toString().trim();
    // this.userToMessageService.contentLength = (innerText2.length + innerText.length) / 2;
    // console.log('innerText to String: ',innerText.toString());
    // console.log('innerText not to String: ',innerText2);
   
    // console.log(this.invisibleSign.length);
    this.userToMessageService.getContentLength();

    // console.log(this.userToMessageService.getContentLength());
  }


  moveCursorToBeginning() {
    // this.userToMessageService.getContentLength();
    this.userToMessageService.placeholderView = false;
    if(this.userToMessageService.contentLength == 0){
    const el = this.inputP.nativeElement;
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.firstChild, 1);
    console.log(el.firstChild);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    }
  }


  checkPlaceholder() {
    this.userToMessageService.getContentLength();
    setTimeout(() => {
      
      if (this.userToMessageService.contentLength == 1) {
        this.userToMessageService.placeholderView = true;
      }
      // console.log(this.userToMessageService.contentLength);
      // console.log(this.userToMessageService.placeholderView);
      
     }, 700); 
  }

  deleteFile(i: number) {
    const filepath = this.userToMessageService.memberCache[i].filelink;
    // this.userToMessageService.memberCache.splice(i, 1);
    this.fileUploadService.deleteFile(filepath);
    this.userToMessageService.memberCache[i].filelink = 'unset';
    this.userToMessageService.memberCache[i].filename = 'unset';
    // document.getElementById('p' + `${i}`).innerHTML = '';
    setTimeout(()=>{
      this.userToMessageService.getContentLength();
    }, 500);
  }


  deleteUserRef(i: number) {
    // this.userToMessageService.memberCache.splice(i, 1);
    this.userToMessageService.memberCache[i].email = 'unset';
    this.userToMessageService.memberCache[i].member = 'unset';
    this.userToMessageService.memberCache[i].userId = 'unset';
    setTimeout(()=>{
      this.userToMessageService.getContentLength();
    }, 500);
  }

  
}
