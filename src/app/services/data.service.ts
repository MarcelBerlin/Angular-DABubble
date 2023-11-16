import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  updateDoc,
  addDoc
} from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  users$: any = [];
  users: any = [];
  userData: any = [];
  directChatPartner: any = [];
  loggedUserLetters: string = '';
  signUpUser: User = new User();
  loggedInUserEmail: string = '';
  loggedInUserData: any;
  loggedInUserId: string = '';
  forgotPasswordMenu: boolean = false;
  badgesArray: any[] = [];


  constructor(private firestore: Firestore) {
    this.subcribeUserData();
  }

  subcribeUserData(): void {
    const coll = collection(this.firestore, 'users');
    this.users$ = collectionData(coll, { idField: 'id' });
    this.users$.subscribe((user: any) => {
      this.userData = user;
      this.userData.sort((a, b) => { // von Basti eingefügte Sortierfunktion nach eingeloggtem User
        if (a.email === this.loggedInUserEmail) return -1;
        if (b.email === this.loggedInUserEmail) return 1;
        return a.email < b.email ? -1 : 1;
      });
      if (this.loggedInUserData === undefined && localStorage.getItem('user')) {
        this.getLoggedInUserData();
      }
      if (this.loggedInUserData !== undefined && localStorage.getItem('user')) {
        this.loggedInUserData = this.userData[0];
        this.updateDirectPartners();
        this.updateUserDirectChatBagesAmount();
      }
    });
  }


  /**
   * Retrieves the logged-in user's data from the userData array and sets the necessary values.
   *
   * @returns {void}
   */
  getLoggedInUserData(): void {
    this.userData.forEach((user: any) => {
      let userJson: any = localStorage.getItem('user');
      this.loggedInUserEmail = JSON.parse(userJson);
      if (user.email.toLowerCase() == this.loggedInUserEmail) {
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
      name: user.name,
      img: user.img,
      email: user.email,
      online: true,
      directChats: user.directChats,
      userId: user.id,
      channels: user.channels,
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
  async saveSignUpUserData(email: string, name: string, img: string): Promise<void> {
    this.signUpUser.email = email.toLowerCase();
    this.signUpUser.name = name;
    this.signUpUser.img = img;
    const coll = collection(this.firestore, 'users');
    let docId = await addDoc(coll, this.signUpUser.toJSON());
    this.signUpUser.userId = docId.id;
    this.updateSignUpUserId();
  }


  /**
   * Updates the user ID in the Firestore database for the signed-up user.
   * Assumes this.signUpUser.userId is set and represents the user's ID.
   *
   * @returns {void}
   */
  updateSignUpUserId(): void {
    const qData = doc(this.firestore, 'users', this.signUpUser.userId);
    const newData = { userId: this.signUpUser.userId };
    updateDoc(qData, newData);
  }


  /**
   * Updates the list of direct chat partners based on user data and their direct chats.
   *
   * @returns {void}
   */
  updateDirectPartners(): void {
    this.directChatPartner = [];
    this.directChatPartner[0] = this.loggedInUserData;
    this.directChatPartner[0].index = 0;
    let i = 0;
    this.userData.forEach(user => {
      user.directChats.forEach(data => {
        if (this.directChatPartnerFound(data)) {
          this.addDirectChatPartnerArray(user, i);
        }
      });
      i++;
    });
  }


  /**
   * Adds a user to the direct chat partner array if not already present and sets the index.
   *
   * @param {any} user - The user to add to the direct chat partner array.
   * @param {number} i - The index of the user.
   * @returns {void}
   */
  addDirectChatPartnerArray(user: any, i: number): void {
    if (!this.directChatPartner.includes(user)) {
      this.directChatPartner.push(user);
      this.directChatPartner[this.directChatPartner.length - 1].index = i;
    }
  }


  /**
   * Checks if there are no direct chat partners.
   *
   * @returns {boolean} True if there are no direct chat partners, false otherwise.
   */
  noDirectChatPartner(): boolean {
    return this.directChatPartner.length == 0;
  }


  /**
   * Checks if a direct chat partner is found based on certain conditions.
   *
   * @param {any} data - The data to check for direct chat partner conditions.
   * @returns {boolean} True if a direct chat partner is found, false otherwise.
   */
  directChatPartnerFound(data: any): boolean {
    return data.partnerId === this.loggedInUserData.userId && !this.chatInhibition(data) && data.ownId !== this.loggedInUserData.userId;
  }


  /**
   * Checks if chat inhibition is present for a specific chat.
   *
   * @param {any} data - The chat data to check for inhibition.
   * @returns {boolean} True if chat inhibition is present, false otherwise.
   */
  chatInhibition(data: any): boolean {
    let chatInhibition: boolean = false;
    for (let i = 0; i < this.userData[0].directChats.length; i++) {
      const chat = this.userData[0].directChats[i];
      if (chat.directChatId == data.directChatId) chatInhibition = chat.inhibition;
    }
    return chatInhibition;
  }


  /**
   * Sets inhibition for the logged-in user's direct chat and updates the user data.
   *
   * @returns {void}
   */
  inhibitionOfDirectChat(): void {
    this.loggedInUserData.inhibition = true;
    this.updateUser();
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
        console.log('google user creating failed', error.code);
      });
    }
  }


  /**
   * Updates the user data in Firestore.
   *
   * @returns {Promise<void>} A promise that resolves when the update operation is complete.
   */
  async updateUser(): Promise<void> {
    const qData = doc(this.firestore, 'users', this.loggedInUserData.userId);
    const newData = this.loggedInUserData;
    updateDoc(qData, newData)
      .then(() => {
        // this.directChatActive = true;
      })
      .catch((error) => {
        console.log('update user failed');
      });
  }


  /**
   * Creates an array of badges representing the new message amounts for each user's direct chats.
   *
   * @returns {void}
   */
  createDirectChatBadges(): void {
    this.badgesArray = [];
    for (let i = 0; i < this.userData.length; i++) {
      this.userData[0].directChats.forEach((directChat) => {
        if (directChat.partnerId == this.userData[i].userId) {
          this.badgesArray[i] = directChat.newMessageAmount;
        } else if (this.badgesArray[i] == undefined) {
          this.badgesArray[i] = 0;
        }
      });
    }
  }


  /**
   * Updates the new message amount for direct chats in the logged-in user's data
   * based on the stored data in local storage and then recreates the direct chat badges.
   *
   * @returns {void}
   */
  updateUserDirectChatBagesAmount(): void {
    this.userData.forEach((user: any) => {
      let userJson: any = localStorage.getItem('user');
      this.loggedInUserEmail = JSON.parse(userJson);
      // user?.directChat hinzugefügt. gez Basti
      if (user.email == this.loggedInUserEmail && user?.directChat) {
        for (let i = 0; i < user.directChats.length; i++) {
          this.loggedInUserData.directChats[i].newMessageAmount =
            user.directChats[i].newMessageAmount;
        }
      }
    });
    this.createDirectChatBadges();
  }
}
