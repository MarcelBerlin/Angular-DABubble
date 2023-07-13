import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogInfoService {
  dialogInfoTitle: string = '';
  dialogTitleClass: string = '';
  dialogInfoSubtitle: string = '';
  dialogInfoArray: any[] = [
    {title: 'E-Mail bereits registriert !', subtitle: 'Bitte geben Sie eine nicht registrierte E-Mail-Adresse ein.', titleClass: 'colorCrimson'},
    {title: 'Login fehlgeschlagen !', subtitle: 'Bitte geben Sie eine gültige Email-Adresse ein.', titleClass: 'colorCrimson'},
    {title: 'Passwort zurücksetzen email gesendet !', subtitle: 'E-Mail zum Zurücksetzen des Passworts gesendet. Überprüfen Sie Ihren Posteingang.', titleClass: 'colorGreen'},
    {title: 'Password reset failed !', subtitle: 'Your Email Address unknown.', titleClass: 'colorCrimson'},
    {title: 'Sinup successfully !', subtitle: 'Your are successfully signup.', titleClass: 'colorGreen'},
    {title: 'System Fehler !', subtitle: 'Bitte versuchen Sie es später nocheinmal.', titleClass: 'colorCrimson'},
    {title: 'No server connection !', subtitle: 'Please check your internet connection.', titleClass: 'colorCrimson'},
    {title: 'Login fehlgeschlagen ! !', subtitle: 'Geben Sie das richtige Passwort ein.', titleClass: 'colorCrimson'},
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
