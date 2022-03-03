import { NzMessageService } from 'ng-zorro-antd/message';
/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('Service: Notification', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        NzMessageService
      ]
    });
  }));

  it('should ...', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
