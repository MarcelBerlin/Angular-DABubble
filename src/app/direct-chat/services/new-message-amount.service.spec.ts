import { TestBed } from '@angular/core/testing';

import { NewMessageAmountService } from './new-message-amount.service';

describe('NewMessageAmountService', () => {
  let service: NewMessageAmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMessageAmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
