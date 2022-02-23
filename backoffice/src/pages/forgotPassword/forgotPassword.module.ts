import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule} from 'ng-zorro-antd/message';

import { NotificationService } from '../../providers/notifications/notification.service';
import { ForgotPasswordComponent } from './forgotPassword.component';
import { ForgotPasswordPageRoutingModule } from './forgotPassword-routing.module';
import { AuthService } from '../../providers/auth/auth.service';


@NgModule({
  imports: [

    ForgotPasswordPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzMessageModule,
  ],
  declarations:[
    ForgotPasswordComponent
  ],
  providers:[NotificationService, AuthService]
})
export class ForgotPasswordPageModule {}
