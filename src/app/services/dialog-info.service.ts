import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogInfoService {
  dialogInfoTitle: string = '';
  dialogTitleClass: string = '';
  dialogInfoSubtitle: string = '';
  dialogInfoArray: any[] = [
    {title: 'Email already registrated !', subtitle: 'Please enter a not registrated Email.', titleClass: 'colorCrimson'},
    {title: 'Login failed !', subtitle: 'Please enter a valid email.', titleClass: 'colorCrimson'},
    {title: 'Password reset email send !', subtitle: 'Password reset email sent, check your inbox.', titleClass: 'colorGreen'},
    {title: 'Password reset failed !', subtitle: 'Your Email Address unknown.', titleClass: 'colorCrimson'},
    {title: 'Sinup successfully !', subtitle: 'Your are successfully signup.', titleClass: 'colorGreen'},
    {title: 'System Error !', subtitle: 'Please try again later.', titleClass: 'colorCrimson'},
    {title: 'No server connection !', subtitle: 'Please check your internet connection.', titleClass: 'colorCrimson'},
    {title: 'Login failed !', subtitle: 'Please enter the correct password.', titleClass: 'colorCrimson'},
  ];

  
  constructor() { }


  /**
   * Sets the dialog information text based on the provided text index.
   * 
   * @param {number} textIndex - The index of the desired text in the dialogInfoArray. 
   * @returns {void}
   */
  setDialogInfoText(textIndex: number): void {
    this.dialogInfoTitle = this.dialogInfoArray[textIndex].title;
    this.dialogInfoSubtitle = this.dialogInfoArray[textIndex].subtitle;
    this.dialogTitleClass = this.dialogInfoArray[textIndex].titleClass;
  }
}
