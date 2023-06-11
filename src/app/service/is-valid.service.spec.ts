import { TestBed } from '@angular/core/testing';

import { IsValidService } from './is-valid.service';

describe('IsValidService', () => {
  let service: IsValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
