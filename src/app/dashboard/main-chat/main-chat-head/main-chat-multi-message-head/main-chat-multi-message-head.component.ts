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
  selectedArray: string = '';
  property: string = '';

  constructor(
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    private varService: VariablesService
  ) {}

  valueAsInput() {
    const inputElement = document.querySelector('.form-control') as HTMLInputElement;
    const value = inputElement.value;
    if (value[0] == '@') {
      this.property = 'email';
    } else {
      this.property = 'name';
    }
    this.selectedArray = 'dataService.userData';
  }

  selectedArrayAsValue() {
    return this.selectedArray;
  }

}
