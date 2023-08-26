import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToMessageComponent } from './user-to-message.component';

describe('UserToMessageComponent', () => {
  let component: UserToMessageComponent;
  let fixture: ComponentFixture<UserToMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserToMessageComponent]
    });
    fixture = TestBed.createComponent(UserToMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
