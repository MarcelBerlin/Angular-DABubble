import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VariablesService {


  /****Platz für alle Variablen****/






  /********************************/

  
  constructor() {}

  [key: string]: any; // Index-Signatur für beliebige Eigenschaften

  selectMenu: string = '';

  getVar(variableValue: string) {
    return this[variableValue];
  }

  setVar(variableValue: string, newValue: number | string | boolean) {
    this[variableValue] = newValue;
  }
}