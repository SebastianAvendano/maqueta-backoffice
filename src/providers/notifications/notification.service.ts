import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class NotificationService {

constructor(
  private notification : NzMessageService
) { }

showMessage(message: string): void{
  this.notification.error(message)
}

createBasicMessage(message: string, error: any): void {
  this.notification.error(message, error);
}


}
