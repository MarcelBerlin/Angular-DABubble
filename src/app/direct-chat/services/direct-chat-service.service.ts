import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectChatServiceService {

  
  constructor() { }


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
