import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdminsComponent } from './list-admins/list-admins.component';
import { ListUserComponent } from './list-user/list-user.component';


const routes: Routes = [
  {
    path: 'users',
    component: ListUserComponent
  },
  {
    path: 'admin',
    component: ListAdminsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
