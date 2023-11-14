import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogInfoService {
  dialogInfoTitle: string = '';
  dialogTitleClass: string = '';
  dialogInfoSubtitle: string = '';
  dialogInfoArray: any[] = [
    {title: 'E-Mail bereits registriert!', subtitle: 'Bitte geben Sie eine nicht registrierte E-Mail-Adresse ein.', titleClass: 'colorCrimson'},
    {title: 'Login fehlgeschlagen!', subtitle: 'Bitte geben Sie eine gültige Email-Adresse ein.', titleClass: 'colorCrimson'},
    {title: 'Email gesendet!', subtitle: 'Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet. Bitte überprüfen Sie Ihren Posteingang.', titleClass: 'colorGreen'},
    {title: 'Zurücksetzen des Passwortes ist fehlgeschlagen!', subtitle: 'Ihre Email-Adresse ist unbekannt.', titleClass: 'colorCrimson'},
    {title: 'Registrierung erfolgreich!', subtitle: 'Sie haben sich erfolgreich registriert.', titleClass: 'colorGreen'},
    {title: 'System Fehler!', subtitle: 'Bitte versuchen Sie es später noch einmal.', titleClass: 'colorCrimson'},
    {title: 'Keine Verbindung zum Server!', subtitle: 'Bitte überprüfen Sie Ihre Internetverbindung.', titleClass: 'colorCrimson'},
    {title: 'Login fehlgeschlagen!', subtitle: 'Geben Sie das richtige Passwort ein.', titleClass: 'colorCrimson'},
    {title: 'Upload fehlgeschlagen!', subtitle: 'Die Datei darf nicht größer als 5MB sein. Desweiteren sind nur Bilddateien und PDF Dateien erlaubt.', titleClass: 'colorCrimson'},
    {title: 'Info', subtitle: 'Kontakt ausblenden?', titleClass: 'colorCrimson'},
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
