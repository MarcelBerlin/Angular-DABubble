// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable, map, startWith } from 'rxjs';
// import { DataService } from 'src/app/services/data.service';
// import { DialogAddService } from 'src/app/services/dialog-add.service';
// import { VariablesService } from 'src/app/services/variables.service';

// @Component({
//   selector: 'app-main-chat-multi-message-head',
//   templateUrl: './main-chat-multi-message-head.component.html',
//   styleUrls: ['./main-chat-multi-message-head.component.scss'],
// })
// export class MainChatMultiMessageHeadComponent {
//   inputValue: string = '';
//   selectedArray: any[] = ['dataService.dataUser', 'dialogAddService.tags'];
//   property: string = '';
//   sign: string = '';

//   constructor(
//     public dataService: DataService,
//     private dialogAddService: DialogAddService,
//     private varService: VariablesService
//   ) {}

//   control = new FormControl('');
//   filteredInputValue: Observable<string[]>;

//   ngOnInit() {
//     this.filteredInputValue = this.control.valueChanges.pipe(
//       startWith(''),
//       map((value) => this._filter(value || ''))
//     );
//   }

//   private _filter(value: string): string[] {
//     const filterValue = this._normalizeValue(value);
//     const filterData: string[] = [];
//     for (let i = 0; i < this.dataService.userData.length; i++) {
//       const filteredItem = this.dataService.userData[i].name.filter((item) =>
//         this._normalizeValue(item).includes(filterValue)
//       );
//       filterData.push(...filteredItem);
//     }
//     // return this.dataService.userData.filter((item) =>
//     //   this._normalizeValue(item).includes(filterValue)
//     // );
//     return filterData;
//   }

//   private _normalizeValue(value: string): string {
//     return value.toLowerCase().replace(/\s/g, '');
//   }
// }

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
  streets: string[] = [
    'Champs-Élysées',
    'Lombard Street',
    'Abbey Road',
    'Fifth Avenue',
  ];
  filteredArrays: Observable<string[]>;
  sign: string = '';

  constructor(
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    private varService: VariablesService
  ) {}

  ngOnInit() {
    this.filteredArrays = this.control.valueChanges.pipe(
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (filterValue.startsWith('#')) {
      this.sign = 'name';
      return this.dialogAddService.tagsData.filter((element) =>
        this._normalizeValue(element.name).includes(filterValue)
      );
    } else if (filterValue.startsWith('@')) {
      this.sign = 'email';
      return this.dataService.userData.filter((element) =>
        this._normalizeValue(element.email).includes(filterValue)
      );
    } else if (filterValue.startsWith('')) {
      this.sign = 'name';
      return this.dataService.userData.filter((element) =>
        this._normalizeValue(element.name).includes(filterValue)
      );
    }
    return [];
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
