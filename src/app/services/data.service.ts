import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc, updateDoc, deleteDoc, addDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { __param } from 'tslib';
import { ActualChat } from '../direct-chat/models/actual-chat.class';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  users$: any = [];
  users: any = [];
  userData: any = [];
  loggedUserLetters: string = '';
  signUpUser: User = new User();
  loggedInUserEmail: string = '';
  loggedInUserData: any;
  loggedInUserId: string = '';

  forgotPasswordMenu: boolean = false;


  constructor(
    private firestore: Firestore,
  ) {
    const coll = collection(firestore, 'users');
    this.users$ = collectionData(coll, { idField: 'id' });
    this.users$.subscribe((user: any) => {
      this.userData = user;

      this.userData.sort((a, b) => { // von Basti eingefügte Sortierfunktion nach eingeloggtem User
        if (a.email === this.loggedInUserEmail) return -1;
        if (b.email === this.loggedInUserEmail) return 1;
        return a.email < b.email ? -1 : 1;
      });  // ********************************

      if (this.loggedInUserData === undefined && localStorage.getItem('user')) {
        this.getLoggedInUserData();
        // console.log('logged in userData',this.loggedInUserData);
      }
    });
  }

  // userData.sort((a, b) => {
  //   if (a.email === 'guest@guest.de') return -1;
  //   if (b.email === 'guest@guest.de') return 1;
  //   return a.email < b.email ? -1 : 1;
  // });


  /**
  * Retrieves the logged-in user's data from the userData array and sets the necessary values.
  * 
  * @returns {void}
  */
  getLoggedInUserData(): void {
    this.userData.forEach((user: any) => {
      let userJson: any = localStorage.getItem('user');
      this.loggedInUserEmail = JSON.parse(userJson);
      if (user.email == this.loggedInUserEmail) {
        this.loggedInUserData = this.getLoggedUserData(user);
        this.updateUser();
      }
    });

  }


  /**
   * Retrieves the logged user's data from the provided user object.
   * 
   * @param {object} user - The user object containing the logged user's data.
   * @returns {object} - An object containing the relevant user data.
   */
  getLoggedUserData(user: any): any {
    return {
      email: user.email,
      name: user.name,
      img: user.img,
      online: true,
      userId: user.id,
      directChats: user.directChats,
    };
  }


  /**
   * Returns the logged user id.
   * 
   * @returns {string} - The logged user id.
   */
  getUserID(): string {
    return this.loggedInUserData.userId;
  }


  /**
   * Save a new user doc to firestore, with the email of the signed up user email.
   * 
   * @param {string} email - The email address of the signed up user.
   * @returns {void}
   */
  saveSignUpUserData(email: string, name: string): void {
    this.signUpUser.email = email;
    this.signUpUser.name = name;
    const coll = collection(this.firestore, 'users');
    setDoc(doc(coll), this.signUpUser.toJSON()).then(() => {

    }).catch((error) => {
      console.log('save user failed');
    });
  }


  /**
   * Creates a new user with the provided user data, if logged in user not listed yet.
   * 
   * @param {User} user - The user object containing the data to be saved.
   * @returns {void}
   */
  createGoogleUser(user: User): void {
    this.signUpUser = user;
    const coll = collection(this.firestore, 'users');
    if (this.loggedInUserData == undefined) {
      setDoc(doc(coll), this.signUpUser.toJSON()).then(() => {
        console.log('google user created');
      }).catch((error) => {
        console.log('save user failed', error.code);
      });
    }
  }


  /**
   * Updates the user data in Firestore.
   * 
   * @returns {Promise<void>} A promise that resolves when the update operation is complete.
   */
  updateUser(): void {
    const qData = doc(this.firestore, 'users', this.loggedInUserData.userId);
    const newData = this.loggedInUserData;
    updateDoc(qData, newData).then(() => {

    }).catch((error) => {

    })
  }

  // funktionen für den direct chat service !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  /**
   * Firebase collection directChats Id.
   */
  chatDataId: string = 'unset';

  /**
   * Data set Firebase colection document.
   */
  directChat: any;


  /**
   * Saves a chat dataset in the Firestore database by adding a new document to the 'directChats' collection.
   * @param {Object} chatDataSet - The chat dataset object to save in the Firestore database.
   * @returns {Promise<void>} A promise that resolves when the chat dataset is saved successfully.
   */
  async saveChatDataSet(chatDataSet): Promise<void> {
    const coll = collection(this.firestore, 'directChats');
    try {
      let docId = await addDoc(coll, chatDataSet.toJSON());
      this.updateChatDataId(chatDataSet, docId);
    } catch (error) {

    }
  }


  /**
   * Updates the chat dataset ID in the Firestore database for a specific chatDataSet object.
   * 
  * @param {Object} chatDataSet - The chat dataset object to update.
  * @param {Object} docId - The document ID object that holds the chat dataset ID.
  * @returns {void}
  */
  updateChatDataId(chatDataSet, docId) {
    if (chatDataSet.id == 'unset') {
      const qData = doc(this.firestore, 'directChats', docId.id);
      const newData = {
        id: docId.id,
      };
      updateDoc(qData, newData).then(() => {
        this.chatDataId = docId.id;
        this.getChatDataSets(this.chatDataId);
        console.log('chatDataId:', this.chatDataId);
      }).catch((error) => {
        this.chatDataId = 'unset';
      })
    }
  }


  /**
  * Fetches chat data from the Firestore database collection 'directChats' for a specific chat dataset.
  * 
  * @param {string} id - The ID of the chat dataset to retrieve from the 'directChats' collection.
  * @returns {void}
  */
  async getChatDataSets(id: string) {
    const coll = collection(this.firestore, 'directChats');
    const qData = doc(coll, id);
    getDoc(qData).then((chatDataSet) => {
      this.directChat = chatDataSet.data();
      console.log(this.directChat);
    }).catch((error) => {
      console.log('Fehler beim Abrufen des Dokuments:', error.message);
    });
  }


  updateChatDataChat(message) {
    debugger;
    const qData = doc(this.firestore, 'directChats', this.chatDataId);
    const newData = {
      chat: message,
    };
    updateDoc(qData, newData).then(() => {

    }).catch((error) => {
      this.chatDataId = this.chatDataId;
      console.log('Fehler beim Abrufen des Dokuments:');
    })
  }


}






