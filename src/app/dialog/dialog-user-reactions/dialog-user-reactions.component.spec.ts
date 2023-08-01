import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserReactionsComponent } from './dialog-user-reactions.component';

describe('DialogUserReactionsComponent', () => {
  let component: DialogUserReactionsComponent;
  let fixture: ComponentFixture<DialogUserReactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUserReactionsComponent]
    });
    fixture = TestBed.createComponent(DialogUserReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
