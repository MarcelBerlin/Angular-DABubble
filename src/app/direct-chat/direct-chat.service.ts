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
  actualChat: ActualChat = new ActualChat();


  constructor(
    private dataService: DataService,
  ) {
    this.actualChatId = undefined;
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
    // console.log('clickedUserId: ',clickedUserId);
    this.actualChatId = undefined;
    const directChatArray = this.dataService.loggedInUserData.directChats;
    if (directChatArray.length != 0) {
      directChatArray.forEach((directChat: DirectChatIndex) => {
        if (directChat.partnerId == clickedUserId) {
          this.actualChatId = directChat.directChatId;
          this.dataService.chatDataId = directChat.directChatId;
          this.directChatIndex = directChat;
        }
      });
      
    }
    if (this.actualChatId != undefined) {
      // this.dataService.directChat = [];
      // console.log('chat found');
      this.loadChatDataSet(this.actualChatId);
    } else {
      // console.log('chat not found');
      this.actualChatId = undefined;
      this.createNewChatDataSet(clickedUserId);
    }
  }


  /**
   * Loads a specific chat dataset based on the provided chatId using the dataService methods.
   * 
   * @param {string} chatId - The ID of the chat dataset to load.
   * @returns {void}
  */
  loadChatDataSet(chatId): void {
    this.dataService.directChat = [];
    // this.dataService.chatDataId = chatId;
    this.dataService.getChatDataSets(chatId);
    // this.dataService.subcribeDirectChatData();
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
        this.dataService.chatDataId = this.dataService.directChat.id;
        this.dataService.loggedInUserData.directChats.push(this.createDirectChatIndex(clickedUserId));
        this.dataService.updateUser();
        // console.log(this.dataService.directChat);
        this.createNewDirectChatPartnerIndex();
      }, 2000);
    }).catch(() => {
      console.log('Error saving chat data');
    });
  }


  /**
   * Saves a new message to the current chat in the dataService and updates 
   * the chat data in Firestore.
   * 
   * @returns {void}
   */
  saveMessage(): void {
    let today: Date = new Date();
    // console.log(this.directMessage);
    let newMessage = this.directMessage;
    this.actualChat.message = newMessage;
    this.actualChat.name = this.dataService.loggedInUserData.name;
    this.actualChat.date = this.createDateString(today);
    this.actualChat.time = this.createClockString(today);
    // console.log('neues ChatElement: ',this.actualChat);
    // console.log('chatElement in dataService DirectChat vor Speichern:', this.dataService.directChat.chat);
    this.dataService.directChat.chat.push(this.actualChat.toJSON());
    // console.log('directChat nach hinzufügen von new Chat', this.dataService.directChat);
    this.directMessage = '';
    this.dataService.updateChatDataChat();
  }

  //############################################################
  partnerIndex = new DirectChatIndex();
// Update the partner user data with in the direct chats index.
  createNewDirectChatPartnerIndex(){
    this.partnerIndex.ownId = this.chatDataSet.secondMember;
    this.partnerIndex.partnerId =  this.chatDataSet.firstMember;
    this.partnerIndex.lastTimeStamp = this.directChatIndex.lastTimeStamp;
    this.partnerIndex.directChatId = this.directChatIndex.directChatId;
    let partnerDirectChatIndex = this.partnerIndex.toJSON();
    console.log(partnerDirectChatIndex);
    this.dataService.saveNewChatPartnerChatsIndex(partnerDirectChatIndex);
  }
}

