import { UsersService } from 'src/app/services/users.service';
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { HeaderDialogComponent } from 'src/app/dialog/header-dialog/header-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Observable, map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';
import { MessageService } from 'src/app/services/messages.service';
import { DashboardComponentsShowHideService } from '../dashboard-components-show-hide.service';
import { ConditionService } from 'src/app/services/condition.service';
import { MessageToUserService } from 'src/app/direct-chat/services/message-to-user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  actualUser: any;
  control = new FormControl('');
  filteredArrays: Observable<string[]>;
  selectedArray: any = [];
  property: string = '';
  innerWidth: number = 0;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    public varService: VariablesService,
    public messageService: MessageService,
    private dcshService: DashboardComponentsShowHideService,
    public conditionService: ConditionService,
    private messageToUserService: MessageToUserService,
    ) {
  }

  
  @ViewChild('inputField') inputField!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
  }


  ngOnInit() {
    this.filteredArrays = this.control.valueChanges.pipe(
      map((value) => this._filter(value || ''))
    );
  }

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

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onOptionSelected(event: any) {
    const selectedOption = event.option.value;
    this.selectedArray.forEach((element, index) => {
      if (element.name === selectedOption) {
        this.varService.setVar('indexOfSearch', index);
        this.varService.setVar('selectedArrayofSearch', this.selectedArray);
        if (element.name.startsWith('#')) {
          this.messageService.openChannel(this.varService.indexOfSearch); // ADDED BY FELIX
        } else if (element.name.startsWith('')) {
          // this.messageService.messageToUser(this.varService.indexOfSearch); // ADDED BY FELIX
          this.messageToUserService.messageToUser(this.varService.indexOfSearch); // ADDED BY BOSSI
          this.inputField.nativeElement.value = '';
        }
      } else if (element.email === selectedOption) {
        this.varService.setVar('indexOfSearch', index);
        this.varService.setVar('selectedArrayofSearch', this.selectedArray);
        // this.messageService.messageToUser(this.varService.indexOfSearch); // ADDED BY FELIX
        this.messageToUserService.messageToUser(this.varService.indexOfSearch); // ADDED BY BOSSI
        this.inputField.nativeElement.value = '';
      }
    });
  }

  
  /**
   * opens the dialog to show the actual user
   */
  openProfile() {
    const dialogRef = this.dialog.open(HeaderDialogComponent);
    dialogRef.afterClosed();
  }


  /**
   * logs out the actual user
   */
  async logout(): Promise<void> {
    this.auth.signOut();
  }


  backToSideNav(){
    this.varService.mainChatHead = -1;
    this.dcshService.hideNavigation = false;
  }
}