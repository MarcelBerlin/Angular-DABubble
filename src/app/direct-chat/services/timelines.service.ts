import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TimelinesService {
  timeline: string[] = [];
  weekdays: string[] = [
    'Sonntag', 
    'Montag', 
    'Dienstag', 
    'Mittwoch', 
    'Donnerstag', 
    'Freitag', 
    'Samstag'
  ];
  months: string[] = [
    'Januar', 
    'Februar', 
    'März', 
    'April', 
    'Mai', 
    'Juni', 
    'Juli', 
    'August', 
    'September', 
    'Oktober', 
    'November', 
    'Dezember'
  ];


  constructor(
    
  ) { }

  
  /**
   * Creates the timeline based on chat array messages date.
   * 
   * @param {any[]} chat - An array containing chat messages to create the timeline from.
   * @returns {void}
   */
  createTimlines(chat: any[]): void {
    this.timeline = [];
    for (let i = 0; i < chat.length; i++) {
      if (i == 0) {
        this.timeline.push(this.getTimeLineText(chat[i].date));
      } else if (chat[i].date == chat[i - 1].date) {
        this.timeline.push(undefined);
      } else if (chat[i].date != chat[i - 1].date) {
        this.timeline.push(this.getTimeLineText(chat[i].date));
      }
    }
    // this.newMessageAmountService.checkForNewMessages();
  }


  /**
   * Gets the timeline text for a given date.
   * 
   * @param {string} date - The date string in the format "day.month.year" (e.g., "25.07.2023").
   * @returns {string} - The timeline text for the given date.
   */
  getTimeLineText(date: string): string {
    const timelineText: string = this.createTimlineText(date)
    return timelineText;
  }


  /**
   * Converts a date string to a JavaScript Date object.
   * 
   * @param {string} date - The date string in the format "day.month.year" (e.g., "25.07.2023").
   * @returns {Date} - The JavaScript Date object representing the given date.
   */
  convertStringToDateObjekt(date: string): Date{
    const dateString: string = date;
    const dateParts: string[] = dateString.split('.'); 
    const dayString: number = parseInt(dateParts[0], 10);
    const monthString: number = parseInt(dateParts[1], 10) - 1;
    const yearString: number = parseInt(dateParts[2], 10);
    const dateObject: Date = new Date(yearString, monthString, dayString);
    return dateObject;
  }


  /**
   * Creates the timeline text for a given date.
   * 
   * @param {string} date - The date string in the format "day.month.year" (e.g., "25.07.2023").
   * @returns {string} - The timeline text for the given date in the format "Weekday, day month" (e.g., "Montag, 25 Juli").
   */
  createTimlineText(date: string): string {
    const dateObject: Date = this.convertStringToDateObjekt(date);
    const currentTime: Date = dateObject;
    const day: number = currentTime.getDate();
    const weekday: string = this.weekdays[currentTime.getDay()];
    const month: string = this.months[currentTime.getMonth()];
    let timelineText: string = weekday + ', ' + day + ' ' + month;
    return timelineText;
  }
}
