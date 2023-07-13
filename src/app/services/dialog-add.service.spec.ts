import { TestBed } from '@angular/core/testing';

import { DialogAddService } from './dialog-add.service';

describe('DialogAddService', () => {
  let service: DialogAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
