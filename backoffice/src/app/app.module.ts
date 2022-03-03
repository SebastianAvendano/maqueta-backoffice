import { DashboardPageModule } from './../pages/dashboard/dasboard.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

import { ThemeModule } from './@theme/theme.module';
import { BroadCastService } from '../providers/broadcast/index';
import { AuthService } from '../providers/auth/auth.service';
import { ParamsService } from '../providers/navigation/params/params.service';
import { FirebaseService } from '../providers/firebase/firebase.service';
import { NavigatorService } from '../providers/navigation/navigator/navigator.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { UsersPageModule } from '../pages/users/users.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ForgotPasswordPageModule } from 'src/pages/forgotPassword/forgotPassword.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    ThemeModule,
    UsersPageModule,
    LoginPageModule,
    ForgotPasswordPageModule,
    DashboardPageModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthService, FirebaseService, NavigatorService, ParamsService, BroadCastService, AuthService, ParamsService,
    AngularFireAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
