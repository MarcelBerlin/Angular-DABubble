import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPickerBossiComponent } from './emoji-picker-bossi.component';

describe('EmojiPickerBossiComponent', () => {
  let component: EmojiPickerBossiComponent;
  let fixture: ComponentFixture<EmojiPickerBossiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmojiPickerBossiComponent]
    });
    fixture = TestBed.createComponent(EmojiPickerBossiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
