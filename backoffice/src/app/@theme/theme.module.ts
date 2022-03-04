import { AuthService } from './../../providers/auth/auth.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../icons-provider.module';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './layout/components/header/header.component';
import { SidebarService } from './sidebar.service';


const modules = [
  NzLayoutModule,
  NzMenuModule,
  IconsProviderModule,
  AppRoutingModule,
];

const components = [
  LayoutComponent,
  HeaderComponent,
];

// const pipes = [

// ];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [CommonModule, ...components],
  declarations: [...components],
})

export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {

    return {
      ngModule: ThemeModule,
      providers: [SidebarService, AuthService],
    };
  }
}
