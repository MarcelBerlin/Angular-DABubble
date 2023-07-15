import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileViewUsersComponent } from './dialog-profile-view-users.component';

describe('DialogProfileViewUsersComponent', () => {
  let component: DialogProfileViewUsersComponent;
  let fixture: ComponentFixture<DialogProfileViewUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogProfileViewUsersComponent]
    });
    fixture = TestBed.createComponent(DialogProfileViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
