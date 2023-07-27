import { Injectable } from '@angular/core';
import { TimeStamp } from './models/time-stamp';
import { DirectChatIndex } from './models/direct-chat-index';
import { ChatDataSet } from './models/chat-data-set';
import { DataService } from '../services/data.service';
import { ActualChat } from './models/actual-chat.class';
@Injectable({
  providedIn: 'root'
})
export class DirectChatService {
  actualChatId: string;
  // directChat: any[] = [];
  directChatIndex = new DirectChatIndex();
  timeStamp: TimeStamp = new TimeStamp();
  chatDataSet: ChatDataSet = new ChatDataSet();
  directMessage: string = '';


  constructor(
    private dataService: DataService,
  ) {
    this.getActualTimeStamp();
  }


  //start function
  /**
   * Searches for the chat ID between the logged-in user and the clicked user in the direct chats array.
   * If the chat ID is found, it sets the 'actualChatId' property accordingly.
   * If the chat ID is not found, it creates a new chat dataset for the conversation.
   * 
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat search.
   * @returns {void}
   */
  getChatId(clickedUserId: string): void {
    this.actualChatId = undefined;
    const directChatArray = this.dataService.loggedInUserData.directChats;
    if (directChatArray.length != 0) {
      directChatArray.forEach((directChat: any) => {
        if (directChat.partnerId == clickedUserId) {
          this.actualChatId = directChat.directChatId;
        }
      });
    }
    if (this.actualChatId != undefined){
      console.log('chat found');
      this.loadChatDataSet(this.actualChatId);
    }else{
      console.log('chat not found');
      this.createNewChatDataSet(clickedUserId);
    } 
  }


  loadChatDataSet(chatId): void {
    this.dataService.chatDataId = chatId;
    this.dataService.getChatDataSets(chatId);
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
    this.directChatIndex.ownId = this.dataService.getUserID();
    this.directChatIndex.partnerId = clickedUserId;
    this.directChatIndex.lastTimeStamp = this.getActualTimeStamp();
    this.directChatIndex.directChatId = this.dataService.directChat.id;
    return this.directChatIndex.toJSON();
  }


  // zum Speichen eines neuen chats in Firbase collection directChats. Hier die Grundstruktur.
  // newChatDataSet: Object;

  /**
   * Creates a new chat dataset object for a conversation between the logged-in user and a clicked user.
   * 
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat dataset creation.
   * @returns {void} 
   */
  createNewChatDataSet(clickedUserId: string): void {
    // this.chatDataSet.id = 'unknown';
    this.chatDataSet.lastTimeStamp = this.getActualTimeStamp();
    this.chatDataSet.firstMember = this.dataService.loggedInUserData.userId;
    this.chatDataSet.secondMember = clickedUserId;
    this.chatDataSet.chat = [];
    this.dataService.saveChatDataSet(this.chatDataSet).then(() => {
      setTimeout(() => {
        this.chatDataSet.id = this.dataService.directChat.id;
        this.dataService.loggedInUserData.directChats.push(this.createDirectChatIndex(clickedUserId));
        this.dataService.updateUser();
      }, 2000);
      // this.chatDataSet.id = this.dataService.directChat.id;
      // this.dataService.loggedInUserData.directChats.push(this.createDirectChatIndex(clickedUserId));
      // this.dataService.updateUser();
    }).catch(() =>{
      console.log('Error saving chat data');
    });
    // setTimeout(() => {
    //   this.chatDataSet.id = this.dataService.directChat.id;
    //   this.dataService.loggedInUserData.directChats.push(this.createDirectChatIndex(clickedUserId));
    //   this.dataService.updateUser();
    // }, 5000);


    // return this.chatDataSet;

    // chat: [
    //   {
    //     name: this.dataService.loggedInUserData.name,
    //     date: this.getActualTimeStamp()[1],
    //     time: this.getActualTimeStamp()[2],
    //     message: 'Message',
    //   }
    // ]
  }

  // actualChat: any = {
  //   name: this.dataService.loggedInUserData.name,
  //   date: this.getActualTimeStamp()[1],
  //   time: this.getActualTimeStamp()[2],
  //   message: 'Message',
  // }

  actualChat: ActualChat = new ActualChat();
  saveMessage(): void {
      console.log(this.directMessage);
      let newMessage = this.directMessage;
      this.actualChat.message = newMessage;
      this.actualChat.name = this.dataService.loggedInUserData.name;
      this.actualChat.date = this.getActualTimeStamp()[1];
      this.actualChat.time = this.getActualTimeStamp()[2];
      console.log(this.actualChat);
      this.dataService.directChat.chat.push(this.actualChat.toJSON());
      // funktion update direct chat in firebase server
      this.directMessage = '';
      this.dataService.updateChatDataChat(this.actualChat.toJSON());
  }
}

