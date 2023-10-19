import { Injectable } from '@angular/core';
import { VariablesService } from './variables.service';
import { DashboardComponentsShowHideService } from '../dashboard/dashboard-components-show-hide.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(
    public dcshService: DashboardComponentsShowHideService, 
    public varService: VariablesService
  ) { }


  /**
   * Determines the visibility of the left container based on responsive conditions and a variable state.
   *
   * @returns {boolean} A boolean indicating whether the left container should be shown.
   * @description
   * This method checks the innerWidth of the viewport and the state of a variable in the VarService
   * to determine whether the left container should be visible. It returns true if the viewport width is
   * greater than or equal to 801 pixels or if the variable `mainChatHead` in the VarService is equal to -1;
   * otherwise, it returns false.
   */
  leftContainerShown(): boolean{
    return innerWidth >= 801 || (innerWidth <= 800 && this.varService.mainChatHead == -1);
  }


  /**
   * Determines the visibility of the main chat container based on responsive conditions and a variable state.
   *
   * @returns {boolean} A boolean indicating whether the main chat container should be shown.
   * @description
   * This method checks the innerWidth of the viewport and the state of a variable in the VarService
   * to determine whether the main chat container should be visible. It returns true if the viewport width is
   * greater than or equal to 801 pixels or if the variable `mainChatHead` in the VarService is not equal to -1;
   * otherwise, it returns false.
   */
  mainChatContainerShown(): boolean {
    return innerWidth >= 801 || innerWidth <= 800 && this.varService.mainChatHead != -1;
  }


  /**
   * Determines the visibility of the main chat based on responsive conditions and the state of the secondary chat slide-out.
   *
   * @returns {boolean} A boolean indicating whether the main chat should be shown.
   * @description
   * This method checks the innerWidth of the viewport and the state of the `secondaryChatSlideOut` property
   * in the `dcshService` to determine whether the main chat should be visible. It returns true if the viewport
   * width is greater than or equal to 801 pixels or if the `secondaryChatSlideOut` property is truthy; otherwise,
   * it returns false.
   */
  mainChatShown(): boolean {
    return innerWidth >= 801 || (innerWidth <= 800 && this.dcshService.secondaryChatSlideOut);
  }


  /**
   * Determines the style setting for the secondary chat container based on responsive conditions and the state of the secondary chat slide-out.
   *
   * @returns {string} A string representing the width style setting for the secondary chat container.
   * @description
   * This method checks the innerWidth of the viewport and the state of the `secondaryChatSlideOut` property
   * in the `dcshService` to determine the appropriate width style setting for the secondary chat container. If the viewport
   * width is less than or equal to 800 pixels and `secondaryChatSlideOut` is falsy, it returns '100%'; otherwise, it returns '25%'.
   */
  secondaryChatContainerStyleSetting(): string {
    return innerWidth <= 800 && !this.dcshService.secondaryChatSlideOut  ? '100%' : '25%';
  }


  /**
   * Determines the visibility of the secondary chat container based on responsive conditions and a variable state.
   *
   * @returns {boolean} A boolean indicating whether the secondary chat container should be shown.
   * @description
   * This method checks the innerWidth of the viewport and the state of a variable `mainChatHead` in the `varService`
   * to determine whether the secondary chat container should be visible. It returns true if the viewport width is
   * less than or equal to 800 pixels and `mainChatHead` is not equal to -1, or if the viewport width is greater than or
   * equal to 801 pixels; otherwise, it returns false.
   */
  secondaryChatContainerShown(): boolean {
    return (innerWidth <= 800 && this.varService.mainChatHead != -1 )|| innerWidth >= 801;
  }


  /**
   * Determines the visibility of the navigation bar based on the viewport width.
   *
   * @returns {boolean} A boolean indicating whether the navigation bar should be shown.
   * @description
   * This method checks the `innerWidth` of the viewport to determine whether the navigation bar should be visible.
   * It returns true if the viewport width is greater than 800 pixels; otherwise, it returns false.
   */
  navigationBarShown(): boolean { 
    return innerWidth > 800;
  }


  /**
   * Determines the visibility of the header logo based on responsive conditions and a variable state.
   *
   * @returns {boolean} A boolean indicating whether the header logo should be shown.
   * @description
   * This method checks the `innerWidth` of the viewport and the state of a variable `mainChatHead` in the `varService`
   * to determine whether the header logo should be visible. It returns true if the viewport width is greater than or
   * equal to 801 pixels or if the variable `mainChatHead` in the VarService is equal to -1; otherwise, it returns false.
   */
  headerLogoShown(): boolean {
    return innerWidth >= 801 || this.varService.mainChatHead == -1;
  }


  /**
   * Determines the visibility of the code learning div based on responsive conditions and a variable state.
   *
   * @returns {boolean} A boolean indicating whether the code learning div should be shown.
   * @description
   * This method checks the `innerWidth` of the viewport and the state of a variable `mainChatHead` in the `varService`
   * to determine whether the code learning div should be visible. It returns true if the viewport width is less than or
   * equal to 800 pixels and the variable `mainChatHead` in the `varService` is not equal to -1; otherwise, it returns false.
   */
  codeLerningDivShown(): boolean {
    return innerWidth <= 800 && this.varService.mainChatHead != -1;
  }
}
