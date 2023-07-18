import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationBetweenComponent } from './conversation-between.component';

describe('ConversationBetweenComponent', () => {
  let component: ConversationBetweenComponent;
  let fixture: ComponentFixture<ConversationBetweenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationBetweenComponent]
    });
    fixture = TestBed.createComponent(ConversationBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
