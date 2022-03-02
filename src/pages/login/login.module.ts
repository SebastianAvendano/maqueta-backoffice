import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule} from 'ng-zorro-antd/message';

import { LoginComponent } from './login.component';
import { NotificationService } from '../../providers/notifications/notification.service';


@NgModule({
  imports: [

    LoginPageRoutingModule,
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
    LoginComponent
  ],
  providers:[NotificationService]
})
export class LoginPageModule {}
