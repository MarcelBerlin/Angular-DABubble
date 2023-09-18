import { TestBed } from '@angular/core/testing';

import { MessageInputServiceService } from './message-input-service.service';

describe('MessageInputServiceService', () => {
  let service: MessageInputServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageInputServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
