import { Injectable } from '@angular/core';
import { TimeStamp } from '../models/time-stamp.class';
import { DirectChatIndex } from '../models/direct-chat-index.class';
import { ChatDataSet } from '../models/chat-data-set.class';
import { DataService } from '../../services/data.service';
import { ActualChat } from '../models/actual-chat.class';
import { Firestore, collectionData, collection, setDoc, doc, updateDoc, deleteDoc, addDoc, getDoc } from '@angular/fire/firestore';
import { TimelinesService } from './timelines.service';
@Injectable({
  providedIn: 'root'
})
export class DirectChatService {
  directChatIndex = new DirectChatIndex();
  partnerIndex = new DirectChatIndex();
  timeStamp: TimeStamp = new TimeStamp();
  chatDataSet: ChatDataSet = new ChatDataSet(); // chat in direct chats
  directMessage: string = ''; // two way binding with the entered text in the message field.
  actualChat: ActualChat = new ActualChat(); // for saving purposes, object to save new Chat message.
  directChat: any = []; // array with the direct chat content.
  directChatActive: boolean = true;


  constructor(
    private dataService: DataService,
    private firestore: Firestore,
    private timelineService: TimelinesService
  ) {}


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
   * Retrieves the chat ID for a specific user from the dataService and initiates a search for a direct chat.
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat search.
   * @returns {void}
   */
  getChatId(clickedUserId: string): void {
    this.directChatActive = false; // automatic reload disabled
    this.directChatIndex = new DirectChatIndex(); // actualChatId replaced, could be deleted ?!
    this.searchUserDirectChat(clickedUserId);
  }


  /**
   * Searches for a direct chat between the logged-in user and a clicked user within the directChatArray.
   * If the chat is found, it sets the chatDataId in dataService and loads the chat dataset.
   * If the chat is not found, it creates a new chat dataset.
   * 
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat search.
   * @returns {void}
   */
  searchUserDirectChat(clickedUserId: string): void {
    const directChatArray: [] = this.dataService.loggedInUserData.directChats;
    if (this.userHasDirectChats(directChatArray)) {
      directChatArray.forEach((userDirectChatIndex: DirectChatIndex) => {
        if (userDirectChatIndex.partnerId == clickedUserId) this.directChatIndex = userDirectChatIndex;
      });
    }
    if (this.directChatFound()) this.loadChatDataSet(this.directChatIndex.directChatId);
    else if (this.directChatNotFound()) this.createNewChatDataSet(clickedUserId);
  }


  /**
   * Checks if a user has any direct chats by evaluating the length of the directChatArray.
   * 
   * @param {Array} directChatArray - The array containing direct chat data for the user.
   * @returns {boolean} - Returns true if the directChatArray is not empty, otherwise returns false.
   */
  userHasDirectChats(directChatArray: []): boolean {
    return directChatArray.length != 0;
  }


  /**
   * Checks if a direct chat is found by evaluating whether the directChatId property in the directChatIndex object is defined.
   * @returns {boolean} - Returns true if the directChatId is defined (direct chat is found), otherwise returns false.
   */
  directChatFound(): boolean {
    return this.directChatIndex.directChatId != undefined;
  }


  /**
   * Checks if a direct chat is not found by evaluating whether the directChatId property in the directChatIndex object is undefined.
   * @returns {boolean} - Returns true if the directChatId is undefined (direct chat is not found), otherwise returns false.
   */
  directChatNotFound(): boolean {
    return this.directChatIndex.directChatId == undefined;
  }


  /**
   * Clear the direct chat array and initialize load of the selected direct chat.
   * 
   * @param {string} chatId - The ID of the chat dataset to load.
   * @returns {void}
  */
  loadChatDataSet(chatId: string): void {
    this.directChat = [];
    this.loadChatDataSets(chatId);
  }


  /**
   * Fetches the chat dataset from the "directChats" collection in Firestore based on the provided id.
   * Updates the directChat object with the retrieved data and sets the directChatActive flag to true.
   * 
   * @param {string} id - The ID of the chat dataset to be fetched.
   * @returns {Promise<void>} - A Promise that resolves when the chat dataset is successfully loaded 
   * or rejects if there is an error.
   */
  async loadChatDataSets(id: string) {
    const coll = collection(this.firestore, 'directChats');
    const qData = doc(coll, id);
    getDoc(qData).then((chat) => {
      this.directChat = chat.data();
      this.directChatActive = true;
      this.timelineService.createTimlines(this.directChat.chat);
    }).catch((error) => {
      console.log('Failure during load of the Document');
    });
  }


  /**
   * Creates a new chat dataset object for a conversation between the logged-in user and a clicked user.
   * 
   * @param {string} clickedUserId - The ID of the user that was clicked to initiate the chat dataset creation.
   * @returns {void} 
   */
  createNewChatDataSet(clickedUserId: string): void {
    this.chatDataSet.lastTimeStamp = this.getActualTimeStamp();
    this.chatDataSet.firstMember = this.dataService.loggedInUserData.userId;
    this.chatDataSet.secondMember = clickedUserId;
    this.chatDataSet.chat = [];
    this.chatDataSet.id = 'unset';//hinzugefügt wichtig, da sonst nicht die Id aktualisiert wird.
    this.saveChatDataSet().then(() => {
      console.log('saveChatDataSet called');
    }).catch(() => {
      console.log('Error saving chat data');
    });
  }


  /**
   * Saves a new chat dataset to the "directChats" collection in the Firestore database.
   * After saving the dataset, updates the chatDataSet object with the new document ID and 
   * calls the updateChatDataId method.
   * 
   * @returns {Promise<void>} - A Promise that resolves when the chat dataset is successfully 
   * saved or rejects if there is an error.
   */
  async saveChatDataSet(): Promise<void> {
    const coll = collection(this.firestore, 'directChats');
    try {
      let docId = await addDoc(coll, this.chatDataSet.toJSON());
      this.chatDataSet.id = docId.id;
      this.updateChatDataId();
    } catch (error) {
      console.log('Saved chat dataset failed');
    }
  }


  /**
   * Updates the chat dataset ID in the Firestore database for a specific chatDataSet object.
   * 
   * @param {Object} chatDataSet - The chat dataset object to update.
   * @param {Object} docId - The document ID object that holds the chat dataset ID.
   * @returns {void}
   */
  updateChatDataId(): void {
    const qData = doc(this.firestore, 'directChats', this.chatDataSet.id);
    const newData = { id: this.chatDataSet.id, };
    updateDoc(qData, newData).then(() => {
      this.getChatDataSets();
    }).catch((error) => {
      this.chatDataSet.id = 'unset';
      console.log('chatDataId Update Failed');
    })
  }


  /**
   * Fetches the chat dataset from the "directChats" collection in Firestore based on chatDataSet.id.
   * Updates the directChat object with the retrieved data.Creates a new DirectChatIndex object and 
   * adds it to the directChats array in the loggedInUserData of the dataService.Finally, updates 
   * the user's data in Firestore and creates a new direct chat partner index.
   * 
   * @returns {void}
   */
  getChatDataSets(): void {
    const coll = collection(this.firestore, 'directChats');
    const qData = doc(coll, this.chatDataSet.id);
    getDoc(qData).then((chatDataSet) => {
      this.directChat = chatDataSet.data();
      this.dataService.loggedInUserData.directChats.push(this.createDirectChatIndex());
      this.updateUser();
      if (this.chatDataSet.firstMember != this.chatDataSet.secondMember) {
        this.createNewDirectChatPartnerIndex();
      }
    }).catch((error) => {
      console.log('Fehler beim Abrufen des Dokuments:');
    });
  }


  /**
   * Creates a DirectChatJson object to manage a direct chat between two users.
   * 
   * @param {string} clickedUserId - The ID of the user with whom the direct chat is initiated.
   * @returns {DirectChatJson} A DirectChatJson object representing the direct chat details.
   */
  createDirectChatIndex(): Object {
    this.directChatIndex = new DirectChatIndex();
    this.directChatIndex.ownId = this.dataService.getUserID();
    this.directChatIndex.partnerId = this.chatDataSet.secondMember;
    this.directChatIndex.lastTimeStamp = this.getActualTimeStamp();
    this.directChatIndex.directChatId = this.chatDataSet.id;
    return this.directChatIndex.toJSON();
  }


  /**
   * Creates a new DirectChatIndex object for a direct chat with a partner based on chatDataSet and directChatIndex.
   * The new partner chat index is then saved to the data source.
   * 
   * @returns {void}
   */
  createNewDirectChatPartnerIndex(): void {
    this.partnerIndex = new DirectChatIndex();
    this.partnerIndex.ownId = this.chatDataSet.secondMember;
    this.partnerIndex.partnerId = this.chatDataSet.firstMember;
    this.partnerIndex.lastTimeStamp = this.directChatIndex.lastTimeStamp;
    this.partnerIndex.directChatId = this.directChatIndex.directChatId;
    let partnerDirectChatIndex = this.partnerIndex.toJSON();
    this.saveNewChatPartnerChatsIndex(partnerDirectChatIndex);
  }


  /**
   * Saves a new partner chat index to the directChats array of a specific user in the userData array within the dataService.
   * The user's document in the Firestore database is then updated with the new directChats array.
   * 
   * @param {Object} partnerChatIndex - The new partner chat index to save.
   * @returns {void}
   */
  saveNewChatPartnerChatsIndex(partnerChatIndex): void {
    this.dataService.userData.forEach(user => {
      if (user.userId === partnerChatIndex.ownId) {
        user.directChats.push(partnerChatIndex);
        const qData = doc(this.firestore, 'users', user.userId);
        const newData = {directChats: user.directChats,};
        updateDoc(qData, newData).then(() => {
          
        }).catch((error) => {
          console.log('partner chatIndex set failed');
        })
      }
    });
  }


  /**
   * Saves a new message to the current chat in the dataService and updates 
   * the chat data in Firestore.
   * 
   * @returns {void}
   */
  saveMessage(): void {
    this.directChatActive = false;
    let today: Date = new Date();
    this.actualChat.message = this.directMessage.trim();
    this.actualChat.name = this.dataService.loggedInUserData.name;
    this.actualChat.date = this.createDateString(today);
    this.actualChat.time = this.createClockString(today);
    this.directChat.chat.push(this.actualChat.toJSON());
    this.directMessage = '';
    this.updateFirestoreChat();
    this.updateFirestoreDirectChatIndex();
  }


  /**
   * Updates the lastTimeStamp property of a specific direct chat in the directChats array of the logged-in user's data.
   * Also updates the timeStamp property of the current directChat object.
   * Finally, updates the logged-in user's data in Firestore.
   * 
   * @returns {void}
   */
  updateFirestoreDirectChatIndex() {
    this.directChat.timeStamp = this.getActualTimeStamp();
    this.dataService.loggedInUserData.directChats.forEach(chat => {
      if (chat.directChatId == this.directChat.id) {
        chat.lastTimeStamp = this.getActualTimeStamp();
      }
    });
    this.updateUser();
  }


  /**
   * Updates the chat data (messages) in Firestore for a specific direct chat.
   * Updates the chat property of the Firestore document with the latest chat messages from the directChat object.
   * After updating the data, fetches the updated chat data from Firestore.
   * 
   * @returns {void}
   */
  updateFirestoreChat(): void {
    const qData = doc(this.firestore, 'directChats', this.directChatIndex.directChatId);
    const newData = {
      chat: this.directChat.chat // holt von Firestore den bisherigen chatverlauf
    };
    updateDoc(qData, newData).then(() => {
      this.getFirestoreChat();
    }).catch((error) => {
      console.log('Fehler beim Speichern, UpdateChatData');
    })
  }


  /**
   * Fetches the chat data from Firestore for a specific direct chat identified by directChatIndex.directChatId.
   * Queries the Firestore document, retrieves the data, and assigns it to the directChat object.
   * 
   * @returns {Promise<void>}
   */
  async getFirestoreChat(): Promise<void> {
    const coll = collection(this.firestore, 'directChats');
    const qData = doc(coll, this.directChatIndex.directChatId);
    getDoc(qData).then((chatDataSet) => {
      this.directChat = chatDataSet.data();
    }).catch((error) => {
      console.log('Fehler beim Abrufen des Dokuments:');
    });
  }


  /**
   * Updates the user data in Firestore.
   * 
   * @returns {Promise<void>} A promise that resolves when the update operation is complete.
   */
  async updateUser(): Promise<void> {
    const qData = doc(this.firestore, 'users', this.dataService.loggedInUserData.userId);
    const newData = this.dataService.loggedInUserData;
    updateDoc(qData, newData).then(() => {
      this.directChatActive = true;
    }).catch((error) => {
      console.log('update user failed');
    })
  }
}//end











