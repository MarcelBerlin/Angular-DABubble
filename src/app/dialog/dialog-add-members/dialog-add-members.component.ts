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

  ngOnInit() {
    this.filteredArrays = this.control.valueChanges.pipe(
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.dataService.userData.filter((element) =>
      this._normalizeValue(element.name).includes(filterValue)
    );
  }

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
