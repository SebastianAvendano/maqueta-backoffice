import { DashboardPageModule } from './../pages/dashboard/dasboard.module';
import { NgModule, InjectionToken, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { N, en_US } from 'ng-zorro-antd/i18n';
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
import { FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';

import type { app } from 'firebase-admin';
import { initializeAppCheck, provideAppCheck } from '@angular/fire/app-check';
import { CustomProvider } from 'firebase/app-check';

export const FIREBASE_ADMIN = new InjectionToken<app.App>('firebase-admin');
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirebaseAppModule,
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
    DashboardPageModule,
    provideAppCheck((injector) => {
      let provider: any
      const admin = injector.get<app.App | null>(FIREBASE_ADMIN, null);
      if (admin) {
         provider = new CustomProvider({
          getToken: () =>
            admin.
              appCheck().
              createToken(environment.firebaseConfig.appId, { ttlMillis: 604_800_000, /* 1 week */ }).
              then(({ token, ttlMillis: expireTimeMillis }) => ({ token, expireTimeMillis }))
        });
      }
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: false });
    }, [new Optional(), FIREBASE_ADMIN]),
  ],
  providers: [AuthService, FirebaseService, NavigatorService, ParamsService, BroadCastService, AuthService, ParamsService,
    AngularFireAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
