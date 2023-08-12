import { TestBed } from '@angular/core/testing';

import { EmojiPickerBossiService } from './emoji-picker-bossi.service';

describe('EmojiPickerBossiService', () => {
  let service: EmojiPickerBossiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojiPickerBossiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
