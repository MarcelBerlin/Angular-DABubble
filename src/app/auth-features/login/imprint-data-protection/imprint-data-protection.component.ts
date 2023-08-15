import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-imprint-data-protection',
  templateUrl: './imprint-data-protection.component.html',
  styleUrls: ['./imprint-data-protection.component.scss'],
})
export class ImprintDataProtectionComponent {
  imgPath: string = 'assets/img/arrow_back_black.png';

  constructor(public authService: AuthService) {}

  /**
   * Sets the selected imprint or data protection element.
   *
   * @param {string} element - The element to be selected (imprint or data protection).
   * @returns {void} - Any return value description, if applicable.
   */
  openImprintDataProtection(element: string): void {
    this.authService.selectedImprintOrDataProtection = element;
  }

  /**
   * Handles the hover state of an element and updates the image path accordingly.
   *
   * @param {boolean} element - Indicates whether the element is being hovered over.
   * @returns {void}
   */
  hovered(element: boolean):void {
    this.imgPath = element
      ? 'assets/img/arrow_back_blue.png'
      : 'assets/img/arrow_back_black.png';
  }
}
