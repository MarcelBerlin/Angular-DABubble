import { Injectable } from '@angular/core';
import { TimeStamp } from './models/time-stamp';
import { DirectChatIndex } from './models/direct-chat-index';
import { ChatDataSet } from './models/chat-data-set';
import { DataService } from '../services/data.service';



@Injectable({
  providedIn: 'root'
})
export class DirectChatService {
  actualChatId: string;
  // directChat: any[] = [];
  directChatIndex = new DirectChatIndex();
  timeStamp = new TimeStamp();
  chatDataSet = new ChatDataSet();


  constructor(
    private dataService: DataService
  ) {
    this.getActualTimeStamp();
  }


  /**
   * Returns the current timestamp, date string, and clock string.
   * 
   * @returns {Object} An object containing the current timestamp, date string, and clock string.
   */
  getActualTimeStamp(): Object {
    let today: Date = new Date();
    this.timeStamp.dateTimeNumber = today.getTime();
    this.timeStamp.dateString = this.createDateString(today);
    this.timeStamp.clockString = this.createClockString(today);
    console.log('Time stamp: ', this.timeStamp.toJSON());
    return this.timeStamp.toJSON();
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
  createDirectChatIndex(clickedUserId: string): Object {
    this.directChatIndex.ownId = this.dataService.loggedInUserData.UserId;
    this.directChatIndex.partnerId = clickedUserId;
    this.directChatIndex.lastTimeStamp = this.getActualTimeStamp();
    this.directChatIndex.directChatId = 'unset';
    return this.directChatIndex.toJSON();
  }


  // zum Speichen eines neuen chats in Firbase collection directChats. Hier die Grundstruktur.
  /**
   * Creates a new chat dataset object for a conversation between the logged-in user and a clicked user.
   * 
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat dataset creation.
   * @returns {ChatDataSet} A new chat dataset object with initial values.
   */
  createNewChatDataSet(clickedUserId: string): Object {
    this.chatDataSet.id = 'unknown';
    this.chatDataSet.lastTimeStamp = this.getActualTimeStamp();
    this.chatDataSet.firstMember = this.dataService.loggedInUserData.id;
    this.chatDataSet.secondMember = clickedUserId;
    this.chatDataSet.chat = [];
    return this.chatDataSet;

    // chat: [
    //   {
    //     name: this.dataService.loggedInUserData.name,
    //     date: this.getActualTimeStamp()[1],
    //     time: this.getActualTimeStamp()[2],
    //     message: 'Message',
    //   }
    // ]
  }


  /**
   * Searches for the chat ID between the logged-in user and the clicked user in the direct chat data array.
   * Sets the 'actualChatId' property to the found chat ID, or undefined if not found.
   * 
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat search.
   * @returns {void}
   */
  getChatId(clickedUserId: string): void {
    this.actualChatId = undefined;
    this.dataService.userData.array.forEach(directChats => {
      if (directChats.length > 0) {
        if (directChats.firstMember.id == this.dataService.loggedInUserData.id) {
          if (directChats.secondMember.id == clickedUserId) {
            this.actualChatId = directChats.chatId;
          }
        }
      }
    });
    if (this.actualChatId === undefined) this.createNewChatDataSet(clickedUserId);
    else console.log('chat found') //hier steht die Funktion wenn eine ChatId existiert.
  }


  // Funktionen wenn actualChatId nicht undefined ist ############

  // loadDirectChat() {
  //   let activeDirectChat = ladeFunktion Firebase ! Mit der ChatId.chat;
  //   activeDirectChat.foreach((message) => {
  //     let name = message.name;
  //     let date = message.date;
  //     let time = message.time;
  //     let message = message.message;
  //   });
  // }

}

