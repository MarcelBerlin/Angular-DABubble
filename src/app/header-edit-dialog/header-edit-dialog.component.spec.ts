import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEditDialogComponent } from './header-edit-dialog.component';

describe('HeaderEditDialogComponent', () => {
  let component: HeaderEditDialogComponent;
  let fixture: ComponentFixture<HeaderEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderEditDialogComponent]
    });
    fixture = TestBed.createComponent(HeaderEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
