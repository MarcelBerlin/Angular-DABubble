import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-dialog-add-members',
  templateUrl: './dialog-add-members.component.html',
  styleUrls: ['./dialog-add-members.component.scss'],
})
export class DialogAddMembersComponent {
  control = new FormControl('');
  filteredArrays: Observable<string[]>;
  name: string = 'name';
  img: string = 'img';
  online: string = 'online';

  constructor(
    private dialogRef: DialogRef,
    public tagChannel: DialogAddService,
    public variableService: VariablesService,
    public dataService: DataService
  ) {}

  /**
   * Lifecycle hook called after the component is initialized.
   * Sets up the filteredArrays property based on changes in the control's value.
   * The filtering is performed using the _filter method.
   *
   */
  ngOnInit() {
    this.filteredArrays = this.control.valueChanges.pipe(
      map((value) => this._filter(value || ''))
    );
  }

  /**
   * Filters an array of strings based on the provided value.
   *
   * @param {string} value - The value to be used for filtering.
   * @returns {string[]} - An array of strings that match the filtering criteria.
   *
   */
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.dataService.userData.filter((element) =>
      this._normalizeValue(element.name).includes(filterValue)
    );
  }

  /**
   * Normalizes a given string by converting it to lowercase and removing whitespace.
   *
   * @param {string} value - The string to be normalized.
   * @returns {string} - The normalized string without uppercase characters and whitespace.
   *
   */
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  /**
   * Closes the current dialog.
   *
   */
  close() {
    this.dialogRef.close();
  }
}
