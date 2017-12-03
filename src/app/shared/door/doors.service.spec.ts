import { TestBed, inject } from '@angular/core/testing';

import { DoorsService } from './doors.service';

describe('DoorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoorsService]
    });
  });

  it('should be created', inject([DoorsService], (service: DoorsService) => {
    expect(service).toBeTruthy();
  }));
});
