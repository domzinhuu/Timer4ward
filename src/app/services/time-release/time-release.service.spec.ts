import { TestBed } from '@angular/core/testing';

import { TimeReleaseService } from './time-release.service';

describe('TimeReleaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeReleaseService = TestBed.get(TimeReleaseService);
    expect(service).toBeTruthy();
  });
});
