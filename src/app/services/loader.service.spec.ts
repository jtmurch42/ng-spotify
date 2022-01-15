import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should set isLoading to false to start', () => {
    expect(service.isLoading).toBe(false);
  });

  it('should set isLoading to true', () => {
    service.show();

    expect(service.isLoading).toBe(true);
  });

  it('should set isLoading to false', () => {
    service.show();
    expect(service.isLoading).toBe(true);

    service.hide();
    expect(service.isLoading).toBe(false);
  });
});
