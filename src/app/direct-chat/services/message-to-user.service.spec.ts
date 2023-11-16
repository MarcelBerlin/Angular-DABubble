import { TestBed } from '@angular/core/testing';

import { MessageToUserService } from './message-to-user.service';

describe('MessageToUserService', () => {
  let service: MessageToUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageToUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
