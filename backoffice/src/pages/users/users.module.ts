import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create.component';
import { ListAdminsComponent } from './list-admins/list-admins.component';

//Modules
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UsersPageRoutingModule } from './users-routing.module';

//services
import { UserService } from './users.service';
import { NotificationService } from '../../providers/notifications/notification.service';
import { CreateAdminComponent } from './create-admin/create-admin.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersPageRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzPopconfirmModule,
    NzTagModule,
    NzMessageModule,
  ],
  declarations: [
    ListUserComponent,
    CreateUserComponent,
    CreateAdminComponent,
    ListAdminsComponent
  ],
  providers:[UserService, NotificationService]
})
export class UsersPageModule {}
