import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadComponent } from './dialog-upload.component';

describe('DialogUploadComponent', () => {
  let component: DialogUploadComponent;
  let fixture: ComponentFixture<DialogUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUploadComponent]
    });
    fixture = TestBed.createComponent(DialogUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
