import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VariablesService {
  mainChatHead: number = -1;
  selectedUserToMessage: number = 0;
  selectedUserDetailView: number = 0;
  selectedChannel: number = -1;
  selectedChannelId: string = '';
  conversationBetween: boolean = false;
  channelSelection: boolean = false;
  selectedArrayofSearch: string = '';
  propertyOfSearch: string = '';
  indexOfSearch: number;
  previousScrollTop: number = 0; // for autoscroll functionality
  sign: boolean = false;
  

  constructor() {}

  [key: string]: any; // Index-Signatur für beliebige Eigenschaften

  selectMenu: string = '';

  /**
   * Retrieves the value of the specified variable.
   *
   * This method takes the 'variableValue' parameter as the name of the variable to retrieve.
   * It returns the value of the specified variable.
   *
   * @param {string} variableValue - The name of the variable to retrieve the value from.
   * @returns {any} - The value of the specified variable.
   */
  getVar(variableValue: string) {
    return this[variableValue];
  }

  /**
   * Sets the value of the specified variable with the provided 'newValue'.
   *
   * This method takes the 'variableValue' parameter as the name of the variable to be updated.
   * The 'newValue' parameter can be a string, number, or boolean, representing the new value to set.
   * It sets the value of the specified variable to the given 'newValue'.
   *
   * @param {string} variableValue - The name of the variable to be updated.
   * @param {number | string | boolean} newValue - The new value to set for the specified variable.
   */
  setVar(variableValue: string, newValue: number | string | boolean) {
    this[variableValue] = newValue;
  }


  /**
   * Retrieves the inner width of the browser window.
   * This function returns the inner width of the browser window by 
   * accessing the `window.innerWidth` property.
   *
   * @returns {number} The inner width of the browser window in pixels.
   */
  getInnerBrowserWidth(): number {
    const innerBrowserWidth = window.innerWidth;
    console.log(innerBrowserWidth);
    return innerBrowserWidth;
  }
}
