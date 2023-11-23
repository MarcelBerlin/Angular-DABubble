import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectChatServiceService {

  constructor() { }


  /**
   * Creates a formatted date string in the format 'day.month.year'.
   * 
   * @param {Date} today - The Date object from which to extract the day, month, and year.
   * @returns {string} A formatted date string in the format 'day.month.year'.
   */
  // createDateString(today: Date): string {
  //   let day: string = today.getDate().toString();
  //   let month: string = (today.getMonth() + 1).toString();
  //   let year: string = today.getFullYear().toString();
  //   if (day.length == 1) day = '0' + day;
  //   if (month.length == 1) month = '0' + month;
  //   let dateString: string = day + '.' + month + '.' + year;
  //   return dateString;
  // }


  /**
   * Creates a formated clock string in the format 'hour:minutes'.
   * 
   * @param {Date} today - The Date object from which to extract the hour and minutes.
   * @returns {string} A formatted clock string in the format 'hour:minutes'.
   */
  // createClockString(today: Date): string {
  //   let hour: string = today.getHours().toString();
  //   let minutes: string = today.getMinutes().toString();
  //   if (hour.length == 1) hour = '0' + hour;
  //   if (minutes.length == 1) minutes = '0' + minutes;
  //   let clockString: string = hour + ':' + minutes;
  //   return clockString;
  // }


  /**
   * Checks if a user has any direct chats by evaluating the length of the directChatArray.
   * 
   * @param {Array} directChatArray - The array containing direct chat data for the user.
   * @returns {boolean} - Returns true if the directChatArray is not empty, otherwise returns false.
   */
  userHasDirectChats(directChatArray: []): boolean {
    return directChatArray.length != 0;
  }
}
