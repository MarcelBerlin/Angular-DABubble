import { Injectable } from '@angular/core';
import { TimeStamp } from './interfaces/time-stamp';
import { DirectChatIndex } from './interfaces/direct-chat-index';
import { DataService } from '../services/data.service';


@Injectable({
  providedIn: 'root'
})
export class DirectChatService {
  actualChatId: string;
  // directChat: any[] = [];


  constructor(
    private dataService: DataService
  ) {
    this.getActualTimeStamp();
  }


  /**
   * Returns the current timestamp, date string, and clock string.
   * 
   * @returns {TimeStamp} An object containing the current timestamp, date string, and clock string.
   */
  getActualTimeStamp(): TimeStamp {
    let today: Date = new Date();
    let dateTimeNumber: number = today.getTime();
    console.log('Time stamp: ', { dateTimeNumber: dateTimeNumber, dateString: this.createDateString(today), clockString: this.createClockString(today) });
    return {
      dateTimeNumber: dateTimeNumber,
      dateString: this.createDateString(today),
      clockString: this.createClockString(today)
    };
  }


  /**
   * Creates a formatted date string in the format 'day.month.year'.
   * 
   * @param {Date} today - The Date object from which to extract the day, month, and year.
   * @returns {string} A formatted date string in the format 'day.month.year'.
   */
  createDateString(today: Date): string {
    let day: string = today.getDate().toString();
    let month: string = (today.getMonth() + 1).toString();
    let year: string = today.getFullYear().toString();
    if (day.length == 1) day = '0' + day;
    if (month.length == 1) month = '0' + month;
    let dateString: string = day + '.' + month + '.' + year;
    return dateString;
  }


  /**
   * Creates a formated clock string in the format 'hour:minutes'.
   * 
   * @param {Date} today - The Date object from which to extract the hour and minutes.
   * @returns {string} A formatted clock string in the format 'hour:minutes'.
   */
  createClockString(today: Date): string {
    let hour: string = today.getHours().toString();
    let minutes: string = today.getMinutes().toString();
    if (hour.length == 1) hour = '0' + hour;
    if (minutes.length == 1) minutes = '0' + minutes;
    let clockString: string = hour + ':' + minutes;
    return clockString;
  }


  /**
   * Creates a DirectChatJson object to manage a direct chat between two users.
   * 
   * @param {string} clickedUserId - The ID of the user with whom the direct chat is initiated.
   * @returns {DirectChatJson} A DirectChatJson object representing the direct chat details.
   */
  createDirectChatIndex(clickedUserId: string): DirectChatIndex {
    let ownId: string = this.dataService.loggedInUserData.UserId;
    let partnerId: string = clickedUserId;
    let lastTimeStamp: TimeStamp = this.getActualTimeStamp();
    let directChatId: string = 'unset';
    return { ownId: ownId, partnerId: partnerId, lastTimeStamp: lastTimeStamp, directChatId: directChatId };
  }


  // zum Speichen eines neuen chats in Firbase collection directChats. Hier die Grundstruktur.
  createNewChatDataSet(clickedUserId: string) {
    let timeStamp = this.getActualTimeStamp();
    return {
      id: 'unknown',
      firstMember: this.dataService.loggedInUserData.id,
      secondMember: clickedUserId,
      lastTimeStamp: timeStamp,
      chat: [
        {
          name: this.dataService.loggedInUserData.name,
          date: timeStamp[1],
          time: timeStamp[2],
          message: 'Message',
        }
      ]
    }
  }


  /**
   * Searches for the chat ID between the logged-in user and the clicked user in the direct chat data array.
   * Sets the 'actualChatId' property to the found chat ID, or undefined if not found.
   * 
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat search.
   * @returns {void}
   */
  getChatId(clickedUserId): void {
    this.actualChatId = undefined;
    this.dataService.userData.array.forEach(directChats => {
      if(directChats.length > 0){
        if(directChats.firstMember.id == this.dataService.loggedInUserData.id){
          if (directChats.secondMember.id == clickedUserId){
            this.actualChatId = directChats.chatId;
          }
        }
      }
    });
  }







}
