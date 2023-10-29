import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInputThreadComponent } from './message-input-thread.component';

describe('MessageInputThreadComponent', () => {
  let component: MessageInputThreadComponent;
  let fixture: ComponentFixture<MessageInputThreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageInputThreadComponent]
    });
    fixture = TestBed.createComponent(MessageInputThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
