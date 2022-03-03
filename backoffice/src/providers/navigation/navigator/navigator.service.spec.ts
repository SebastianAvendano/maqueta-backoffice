/* tslint:disable:no-unused-variable */
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NavigatorService } from './navigator.service';

describe('Service: Navigator', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [NavigatorService]
    });
  }));

  it('should ...', inject([NavigatorService], (service: NavigatorService) => {
    expect(service).toBeTruthy();
  }));
});
