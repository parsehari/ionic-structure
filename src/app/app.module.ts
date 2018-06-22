import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { Facebook } from '@ionic-native/facebook'
import { ServiceProvider } from '../providers/service/service';
import { CommonProvider } from '../providers/common/common';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DashboardPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    CommonProvider,
    Network
  ]
})
export class AppModule {}
