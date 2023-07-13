import { TestBed } from '@angular/core/testing';

import { DialogInfoService } from './dialog-info.service';

describe('DialogInfoService', () => {
  let service: DialogInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
