import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-main-chat-multi-message-head',
  templateUrl: './main-chat-multi-message-head.component.html',
  styleUrls: ['./main-chat-multi-message-head.component.scss'],
})
export class MainChatMultiMessageHeadComponent {
  control = new FormControl('');
  filteredArrays: Observable<string[]>;
  selectedArray: any = [];
  property: string = '';

  constructor(
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    private varService: VariablesService
  ) {}

  /**
 * Lifecycle hook called after Angular has initialized all data-bound properties.
 *
 * @returns {void}
 *
 */
  ngOnInit() {
    this.filteredArrays = this.control.valueChanges.pipe(
      map((value) => this._filter(value || ''))
    );
  }


  /**
 * Filters an array of strings based on the normalized input value and sets search parameters.
 *
 * @private
 * @param {string} value - The input value to filter the array.
 * @returns {string[]} The filtered array of strings.
 *
 */
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (filterValue.startsWith('#')) {
      this.property = 'name';
      this.selectedArray = this.dialogAddService.tagsData;
      return this.dialogAddService.tagsData.filter((element) =>
        this._normalizeValue(element.name).includes(filterValue)
      );
    } else if (filterValue.startsWith('@')) {
      this.property = 'email';
      this.selectedArray = this.dataService.userData;
      return this.dataService.userData.filter((element) =>
        this._normalizeValue(element.email).includes(filterValue)
      );
    } else if (filterValue.startsWith('')) {
      this.property = 'name';
      this.selectedArray = this.dataService.userData;
      return this.dataService.userData.filter((element) =>
        this._normalizeValue(element.name).includes(filterValue)
      );
    }
    return [];
  }


  /**
 * Normalizes a string value by converting it to lowercase and removing whitespace.
 *
 * @param {string} value - The string value to be normalized.
 * @returns {string} The normalized string value.
 *
 */
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  /**
 * Handles the selection of an option triggered by an event.
 *
 * @method
 * @param {any} event - The event containing the selected option.
 * @returns {void}
 *
 */
  onOptionSelected(event: any) {
    const selectedOption = event.option.value;
    this.selectedArray.forEach((element, index) => {
      if (element.name === selectedOption) {
        this.varService.setVar('indexOfSearch', index);
        this.varService.setVar('selectedArrayofSearch', this.selectedArray);
      } else if (element.email === selectedOption) {
        this.varService.setVar('indexOfSearch', index);
        this.varService.setVar('selectedArrayofSearch', this.selectedArray);
      }
      this.varService.setVar('propertyOfSearch', 'name');
    });
  }
}
