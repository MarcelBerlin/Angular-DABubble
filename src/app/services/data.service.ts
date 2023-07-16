import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';

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


  constructor(
    private firestore: Firestore
  ) {
    const coll = collection(firestore, 'users');
    this.users$ = collectionData(coll, { idField: 'id' });
    this.users$.subscribe((user: any) => {
      this.userData = user;
      if (this.loggedInUserData === undefined && localStorage.getItem('user')) {
        // setTimeout(() => {
        this.getLoggedInUserData();
        // }, 1000);
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
      if (user.email == this.loggedInUserEmail) {
        this.loggedInUserData = this.getLoggedUserData(user);
        // console.log(this.loggedInUserData);
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
      firstName: user.name,
      lastName: user.img,
      online: false,
    };
  }


  /**
   * Returns the logged user id.
   * 
   * @returns {string} - The logged user id.
   */
  getUserID(): string {
    return this.loggedInUserData.id;
  }


  /**
   * Save a new user doc to firestore, with the email of the signed up user email.
   * 
   * @param {string} email - The email address of the signed up user.
   * @returns {void}
   */
  saveSignUpUserEmail(email: string): void {
    this.signUpUser.email = email;
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
  createGoogleUser(user: User): void{
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
}

