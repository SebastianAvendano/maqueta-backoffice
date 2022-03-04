import { NgModule, InjectionToken, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './@theme/theme.module';
import { AuthService } from '../providers/auth/auth.service';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp, FirebaseApps } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FunctionsModule } from '@angular/fire/functions';

import { AppRoutingModule } from './app-routing.module';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { app } from 'firebase-admin';
import { initializeAppCheck, provideAppCheck, CustomProvider, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { FirebaseService } from 'src/providers/firebase/firebase.service';
import { NavigatorService } from '../providers/navigation/navigator/navigator.service';
import { ParamsService } from '../providers/navigation/params/params.service';
import { BroadCastService } from '../providers/broadcast/index';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';

export const FIREBASE_ADMIN = new InjectionToken<app.App>('firebase-admin');
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    ThemeModule,
    FunctionsModule,
  ],
  providers: [
    AuthService,
    ParamsService,
    FirebaseService,
    NavigatorService,
    BroadCastService,
    AngularFireAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
