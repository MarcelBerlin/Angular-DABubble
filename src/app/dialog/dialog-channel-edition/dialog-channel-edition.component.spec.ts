import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChannelEditionComponent } from './dialog-channel-edition.component';

describe('DialogChannelEditionComponent', () => {
  let component: DialogChannelEditionComponent;
  let fixture: ComponentFixture<DialogChannelEditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChannelEditionComponent]
    });
    fixture = TestBed.createComponent(DialogChannelEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
