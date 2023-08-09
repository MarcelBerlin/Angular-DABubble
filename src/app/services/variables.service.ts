import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class VariablesService {
  mainChatHead: number = 0;
  selectedUserToMessage: number = 0;
  selectedUserDetailView: number = 0;
  selectedChannel: number;
  selectedChannelId: string = '';
  conversationBetween: boolean = false;
  channelSelection: boolean = false;
  selectedArrayofSearch: string = '';
  propertyOfSearch: string = '';
  indexOfSearch: number;

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
}
