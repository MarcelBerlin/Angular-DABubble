import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { __param } from 'tslib';


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


  constructor(
    private firestore: Firestore,
  ) {
    const coll = collection(firestore, 'users');
    this.users$ = collectionData(coll, { idField: 'id' });
    this.users$.subscribe((user: any) => {
      this.userData = user;    

      if (this.loggedInUserData === undefined && localStorage.getItem('user')) {
        this.getLoggedInUserData();
        
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


  /**
   * Updates the user data in Firestore.
   * 
   * @returns {Promise<void>} A promise that resolves when the update operation is complete.
   */  
  updateUser(): void{
    const qData = doc(this.firestore, 'users', this.loggedInUserData.userId);
    const newData = this.loggedInUserData;
    updateDoc(qData, newData).then(() => {
      
    }).catch((error) => {
      
    })
  }
}


