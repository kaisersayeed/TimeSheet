import { TestBed } from '@angular/core/testing';

import { TimeSheetService } from './timesheet.service';

describe('TimeSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeSheetService = TestBed.get(TimeSheetService);
    expect(service).toBeTruthy();
  });
});
